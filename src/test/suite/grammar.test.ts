import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import 'mocha';

interface GrammarPattern { match?: string; name?: string; comment?: string; }
interface GrammarRepository { [key: string]: { patterns: GrammarPattern[] } }
interface GrammarFile { repository: GrammarRepository; }

function loadGrammar(): GrammarFile {
    const grammarPath = path.join(__dirname, '..', '..', '..', 'syntaxes', 'songtxt.tmLanguage.json');
    const raw = fs.readFileSync(grammarPath, 'utf8');
    return JSON.parse(raw);
}

function getPattern(name: string, index = 0): RegExp {
    const grammar = loadGrammar();
    const repo = grammar.repository[name];
        if (!repo) { throw new Error(`Repository section '${name}' not found`); }
    const pattern = repo.patterns[index];
        if (!pattern.match) { throw new Error(`Pattern ${index} in '${name}' has no match`); }
    // The grammar regexes are written without delimiters; replicate TextMate default (no flags unless obviously needed)
    // We often want global matching in tests to collect all tokens.
    // TextMate Oniguruma supports \z (end of string). JavaScript does not; \z becomes literal 'z'.
    // Emulate \z with a lookahead for end-of-string.
    const jsPattern = pattern.match.replace(/\\z/g, '(?=$)');
    return new RegExp(jsPattern, 'g');
}

describe('SongTxt Grammar Regex Suite', () => {
    const chordRegex = getPattern('chords', 0); // Chords above lyrics
    const noChordRegex = getPattern('chords', 1); // N.C.
    const tuningRegex = getPattern('chords', 2); // Tuning note (single char before '|')
    const sectionRegex = getPattern('sections', 0); // [Verse]

    it('matches basic chords in a progression line (including final chord with no trailing space)', () => {
        const line = 'C   G   Am  F';
        const matches = line.match(chordRegex) || [];
        // trim because regex includes trailing space in capture due to final group
        const normalized = matches.map(m => m.trim());
        assert.deepStrictEqual(normalized, ['C', 'G', 'Am', 'F']);
    });

    it('matches chord qualities and extensions', () => {
        const samples = ['Cmaj7', 'C#dim', 'Bbmin', 'F+', 'Gsus4', 'Eadd9'];
        for (const s of samples) {
            assert.ok(chordRegex.test(s + ' '), `Expected to match with trailing space: ${s}`); // allow space after
            chordRegex.lastIndex = 0;
            assert.ok(chordRegex.test(s), `Expected to match end-of-line chord: ${s}`);
            chordRegex.lastIndex = 0; // reset because of /g flag
        }
    });

    it('does NOT match inside normal words', () => {
        const word = 'Cab ';
        assert.strictEqual(chordRegex.test(word), false, 'Should not falsely match part of a word');
        chordRegex.lastIndex = 0;
    });

    it('matches N.C. (no chord)', () => {
        assert.ok(noChordRegex.test('N.C.'), 'Expected N.C. to match');
    });

    it('matches tuning line note prefixes', () => {
        const line = 'e|-----------------------------------------------------------------------------|';
    const match = (line.match(tuningRegex) ?? []) as string[];
    assert.ok(match.includes('e'), 'Expected to find tuning note e');
    });

    it('matches section headers', () => {
        const sections = ['[Verse]', '[Chorus 2]', '[Bridge - Clean]'];
        for (const s of sections) {
            assert.ok(sectionRegex.test(s), `Section should match: ${s}`);
            sectionRegex.lastIndex = 0;
        }
    });

    it('matches final chord at end-of-line without trailing space', () => {
        const line = 'Dm   G7   Cmaj7';
        const matches = line.match(chordRegex) || [];
        const normalized = matches.map(m => m.trim());
        assert.deepStrictEqual(normalized, ['Dm', 'G7', 'Cmaj7']);
    });

    it('does not match lowercase root chords (by design)', () => {
        const line = 'Dm   em';
        const matches = line.match(chordRegex) || [];
        const normalized = matches.map(m => m.trim());
        // Lowercase 'em' should NOT be matched under current grammar (uppercase roots only)
        assert.deepStrictEqual(normalized, ['Dm']);
    });

    it('matches mixed-case chord qualities after uppercase root', () => {
        const line = 'Dm   DM';
        const matches = line.match(chordRegex) || [];
        const normalized = matches.map(m => m.trim());
        // Lowercase 'm' should be matched under current grammar (mixed case allowed)
        assert.deepStrictEqual(normalized, ['Dm', 'DM']);
    });
});
