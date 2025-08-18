# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SongTxt is a Visual Studio Code extension that improves the experience of typing music transcriptions in plain text files. It provides syntax highlighting for chords, song sections, comments, and guitar tablature following Ultimate Guitar formatting guidelines.

## Development Commands

### Build and Compilation
```bash
npm run compile     # Compile TypeScript to JavaScript
npm run watch       # Watch mode compilation
```

### Testing
```bash
npm test           # Run grammar/regex tests only
npm run pretest    # Compile and lint before testing
```

### Linting
```bash
npm run lint       # Run ESLint on TypeScript source files
```

### Extension Development
```bash
npm run vscode:prepublish  # Prepare extension for publishing (compiles code)
```

## Architecture

### Core Components

**Extension Entry Point** (`src/extension.ts`)
- Main activation/deactivation logic
- Registers two placeholder commands: `extension.enableSongtxt` and `extension.disableSongtxt`
- Creates status bar notification system via `StateNotification` class
- Commands currently only show notifications (placeholder functionality)

**Language Definition** (`package.json` contributes section)
- Defines `songtxt` language for `.txt` and `.tab` files
- Associates grammar, snippets, and language configuration
- Configures VS Code editor defaults (disables indent guides, occurrence highlighting)

**Syntax Highlighting** (`syntaxes/songtxt.tmLanguage.json`)
- TextMate grammar defining three main pattern types:
  - `sections`: Section headers like `[Verse]`, `[Chorus 2]`
  - `chords`: Complex regex for chord symbols (C, Am, F#maj7, G/B, etc.) and `N.C.` (no chord)
  - `comments`: Currently not implemented in grammar
- Chord regex includes support for: root notes, accidentals, qualities, extensions, sus chords, add chords, slash chords
- Tuning notes pattern for tablature lines (single notes before `|`)

**Code Snippets** (`snippets/songtxt.json`)
- Guitar tablature templates for various tunings:
  - Standard 6-string (`-6standard`)
  - Half-step down (`-6halfstepdown`) 
  - Drop-D (`-6dropd`)
  - 7-string standard and half-step down

**Language Configuration** (`language-configuration.json`)
- Basic bracket matching and auto-closing pairs
- Standard surrounding pairs for quotes and brackets

### Testing Architecture

**Grammar Tests** (`src/test/suite/grammar.test.ts`)
- Comprehensive regex testing for chord recognition patterns
- Tests positive and negative cases to prevent false matches in lyrics
- Validates section headers, tuning notes, and special cases
- Uses Mocha framework with custom grammar loading utilities
- Key test categories:
  - Basic chord progressions
  - Chord qualities and extensions  
  - Word boundary detection (prevents false positives)
  - Slash chord support
  - Mixed case handling
  - End-of-line chord matching

## Development Notes

### Chord Recognition Logic
The chord regex is complex and designed to avoid false positives in lyrics. It uses word boundaries and lookaheads to distinguish between chord symbols and regular text. Key considerations:
- Only matches uppercase root notes (C, D, E, F, G, A, B)
- Supports accidentals (b, bb, #, ##)
- Handles various qualities (m, min, maj, dim, aug, +)
- Includes extensions (2, 4, 5, 6, 7, 9, 11, 13)
- Supports suspended chords (sus, sus2, sus4)
- Allows slash chords (C/G)

### Extension Structure
This is a standard VS Code extension with TypeScript source. The extension is minimal - most functionality comes from the TextMate grammar and language configuration rather than programmatic features.

### Build Process
- TypeScript compiles to `out/` directory
- Extension entry point is `out/extension.js`
- Tests compile to `out/test/` with source maps enabled