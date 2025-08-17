# SongTxt CHANGELOG

All notable changes to the SongTxt extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.1.7] - 2025-08-16

### Fixed

- Improved chord highlighting to avoid false positives in lyrics (e.g., "A beautiful day" no longer highlights "A")
- Added support for slash chords (e.g., G/B, Am/C)
- Fixed apostrophes being highlighted with borders in contractions like "don't"
- Enhanced word boundary detection for more accurate chord recognition

## [0.1.6] - 2022-08-01

### Added

- Much improved support for recognizing chord names from [@c-d](https://github.com/c-d) and [@RBekking](https://github.com/RBekking).

## [0.1.5] - 2018-10-03

### Added

- Disabled Occurrence Highlighting (editor.occurrencesHighlight) which just got in the way

## [0.1.4] - 2018-09-10

### Added

- Now support `.tab` files in addition to `.txt` files.

## [0.1.3] - 2018-09-05

### Added

- Surrounds With_ support for brackets. Just select the text (e.g., `Verse`) you want to surround with brackets and hit the `[` key to change it to `[Verse]`

### Changed

- Disabled _Indent Guides_ (`editor.renderIndentGuides`) as they just cluttered things up for SongTxt files.

## [0.1.2] - 2018-09-03

### Added

- _Code Snippets_ support for guitar tablature sections/lines (e.g., try `Ctrl+Space`, `-6s`)

## [0.1.1] - 2018-09-03

### Added

- Project logo (that's _maybe_ better than not having one at all)

## [0.1.0] - 2018-09-02

### Added

- Support for syntax highlighting/colorization for:
  - Chords
  - Comments
  - Section headers
  - Tablature tunings
