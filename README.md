# SongTxt README

SongTxt is a simple Visual Studio Code extension that improves the experience around typing in music transcriptions in plain text files. It is built to follow the formatting guidelines used by [Ultimate Guitar](https://www.ultimate-guitar.com/contribution/help/rubric).

## Install

Install the extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=gusper.songtxt) or search for `SongTxt` from the Extensions pane in Visual Studio Code.

## Features

See the list of features and documentation at the [SongTxt Wiki](https://github.com/gusper/SongTxt-vscode/wiki).

## Screenshot

![Screenshot](https://i.imgur.com/gFU6lS8.png)

## Known Issues

- The two commands the extension adds currently do nothing other than pop up a notification when executed. More to come soon there as well.

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
You should see output ending with something like `8 passing` (count may grow as new cases are added).

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
