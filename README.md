# SongTxt README

SongTxt is a simple Visual Studio Code extension that improves the experience around typing in music transcriptions in plain text files. It is built to follow the formatting guidelines used by [Ultimate Guitar](https://www.ultimate-guitar.com/contribution/help/rubric).

## Install

Install the extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=gusper.songtxt) or search for `SongTxt` from the Extensions pane in Visual Studio Code.

## Features

This is a *very* early version that should be considered alpha level at most.

- Syntax highlighting/colorization
  - Chord names above lyrics
  - Section headers (e.g., `[Verse]`, `[Chorus]`)
  - Tunings in guitar tablature
  - Comments (text in parentheses)
- Code snippets for insertion guitar tablature sections
  - E.g., hit Ctrl+Space, -6 and you'll see a few tunings to pick from

![Screenshot](https://i.imgur.com/FWrCtGM.gif)

## Known Issues

- Automatically kicks in for all .txt files. This is probably not desirable in all cases. Will figure out a better model soon.
- The two commands the extension adds currently do nothing other than pop up a notification when executed. More to come soon there as well.

## Release Notes

- See [CHANGELOG](.\CHANGELOG.md) file.

## Requirements

- None

## Extension Settings

- None yet