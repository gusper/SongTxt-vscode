# SongTxt README

SongTxt is a simple Visual Studio Code extension that improves the experience around typing in music transcriptions in plain text files. It is built to follow the formatting guidelines used by [Ultimate Guitar](https://www.ultimate-guitar.com/contribution/help/rubric).

## Install

Install the extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=gusper.songtxt) or search for `SongTxt` from the Extensions pane in Visual Studio Code.

## Features

- **Syntax Highlighting**: Automatic highlighting for chords, song sections, and guitar tablature in `.txt` and `.tab` files
- **Toggle Control**: Enable or disable SongTxt syntax highlighting on demand
- **Status Bar Integration**: Visual indicator showing current state with one-click toggle
- **Smart File Detection**: Automatically applies to Ultimate Guitar formatted text files
- **Grammar Testing**: Comprehensive regex testing to ensure accurate chord recognition

See the full list of features and documentation at the [SongTxt Wiki](https://github.com/gusper/SongTxt-vscode/wiki).

## Commands

SongTxt provides two commands accessible via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

- **Enable SongTxt**: Activates syntax highlighting for `.txt` and `.tab` files
- **Disable SongTxt**: Deactivates syntax highlighting (files appear as plain text)

You can also toggle between enabled/disabled states by clicking the SongTxt status bar item.

## Screenshot

![Screenshot](https://i.imgur.com/gFU6lS8.png)

## Release Notes

- See [CHANGELOG](CHANGELOG.md) file.

## Requirements

- None

## Extension Settings

- None yet

## Testing

Currently only grammar/regex tests are maintained.

### Prerequisites
```powershell
npm install
```

### Run Tests
Compile then run the grammar test suite:
```powershell
npm run compile
npm test
```
You should see output ending with something like `16 passing` (count may grow as new cases are added).

### Add More Tests
Edit `src/test/suite/grammar.test.ts`, add new `test(...)` blocks, then rerun:
```powershell
npm test
```

### Lint
```powershell
npm run lint
```

### Troubleshooting
- If patterns disappear, confirm `syntaxes/songtxt.tmLanguage.json` still has the expected repository entries.
- After changing regex order, update indices in the test file or refactor to search by `comment`.

## Acknowledgments / Open Source

SongTxt is built on and benefits from the wider open source ecosystem:

- **Visual Studio Code Extension API** – Copyright (c) Microsoft Corporation. Licensed under the [MIT License](https://github.com/microsoft/vscode/blob/main/LICENSE.txt).
- **TypeScript** – (c) Microsoft Corporation. [Apache 2.0](https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt).
- **Mocha** (test framework) – (c) OpenJS Foundation and contributors. [MIT](https://github.com/mochajs/mocha/blob/master/LICENSE).
- **ESLint** and **@typescript-eslint** – (c) OpenJS Foundation & Contributors. [MIT](https://github.com/eslint/eslint/blob/main/LICENSE).
- **Node.js type definitions (@types/node)** – DefinitelyTyped contributors. [MIT](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE).
- **VS Code type definitions (@types/vscode)** – Microsoft. [MIT](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE).

Tab / chord formatting inspiration: Community conventions as documented by [Ultimate Guitar contribution rubric](https://www.ultimate-guitar.com/contribution/help/rubric).

If you believe additional attribution is required for any component, please open an issue or pull request.
