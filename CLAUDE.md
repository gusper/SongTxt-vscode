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
- Registers two functional commands: `extension.enableSongtxt` and `extension.disableSongtxt`
- Creates status bar notification system via `StateNotification` class (in separate file)
- Implements dynamic enable/disable of syntax highlighting for .txt/.tab files
- Uses VS Code's `setTextDocumentLanguage` API to control language modes
- Manages file associations programmatically (language configuration handled statically)
- Event-driven system that maintains state across tab switches and file operations

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
This is a standard VS Code extension with TypeScript source. The extension combines TextMate grammar/language configuration with programmatic features for dynamic control:

**Key Implementation Details:**
- **State Management**: Uses `context.globalState` to persist enabled/disabled state across sessions
- **File Association Control**: Dynamically modifies VS Code's `files.associations` setting to control which files use the `songtxt` language
- **Document Language Control**: Uses `vscode.languages.setTextDocumentLanguage()` to immediately change language modes of open documents
- **Event Listeners**: Monitors document opening, tab switching, and editor visibility changes to maintain consistent state
- **Modular Design**: StateNotification class separated into `src/stateNotification.ts` for better code organization

**Enable/Disable Mechanism:**
1. **Enable**: Associates .txt/.tab files with `songtxt` language, applies syntax highlighting to open documents
2. **Disable**: Removes file associations, converts open documents to `plaintext` mode (removes highlighting)
3. **State Persistence**: Remembers user preference and applies it on extension activation
4. **Language Features**: Bracket matching and auto-closing handled by static `language-configuration.json`

### Build Process
- TypeScript compiles to `out/` directory
- Extension entry point is `out/extension.js`
- Tests compile to `out/test/` with source maps enabled