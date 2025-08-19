# SongTxt CHANGELOG

All notable changes to the SongTxt extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.1.10] - 2025-08-18

### Changed

- Updated all dependencies to latest versions (TypeScript 5.9, ESLint 9.33, Mocha 11.7, etc.)
- Migrated ESLint configuration from legacy .eslintrc.json to new flat config format (eslint.config.js)
- Updated VS Code engine requirement to ^1.103.0
- Improved development workflow with better VS Code task configuration
- Removed deprecated activationEvents (VS Code auto-generates from command declarations)

### Fixed

- Fixed linting issues (use const instead of let for non-reassigned variables)
- Fixed F5 debugging in VS Code Extension Development Host
- Improved .vscodeignore to exclude unnecessary files from VSIX package

### Security

- Updated braces dependency to address security vulnerabilities

## [0.1.9] - 2025-08-18

### Changed

- Updated extension logo to new design
- Significantly reduced VSIX package size through improved file exclusions

## [0.1.8] - 2025-08-18

### Fixed

- Updated sample song content

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
