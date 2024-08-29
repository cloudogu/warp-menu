# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Adjust warp menu to new theme which enables white labeling (#49)
    - Refactor code to use newer js version
    - Use vite as build tool
    - Use Tailwind for CSS

### Removed
- gulp as build tool (#49)
- Support for SCSS   (#49)

## [v1.7.3](https://github.com/cloudogu/warp-menu/releases/tag/v1.7.3)
### Changed
- Replaced all references to myCloudogu with references to the cloudogu platform (#45)

## [v1.7.2](https://github.com/cloudogu/warp-menu/releases/tag/v1.7.2)
### Fixed
- The menu will be collapsed when clicking outside (#43)

## [v1.7.1](https://github.com/cloudogu/warp-menu/releases/tag/v1.7.1)
### Fixed
- Remove Warp Menu from print layouts (#41)

## [v1.7.0](https://github.com/cloudogu/warp-menu/releases/tag/v1.7.0)
### Changed
- Rename development apps to applications (#39)

## [v1.6.0](https://github.com/cloudogu/warp-menu/releases/tag/v1.6.0)
### Removed
- removed information category mapping (#36) 
### Changed
- update configuration documentation

## [v1.5.0](https://github.com/cloudogu/warp-menu/releases/tag/v1.5.0)
### Added
- fonts are copied into warp menu (#32)
- new icons to replace unreliable special characters (#32)

### Fixed
- remove superfluous script
- enable gulp to move fonts and svgs (#32)

## [v1.4.0](https://github.com/cloudogu/warp-menu/releases/tag/v1.4.0)
### Changed
- Changed the way the last category (support entries) are generated (#29)

## [v1.3.0](https://github.com/cloudogu/warp-menu/releases/tag/v1.3.0)
### Changed
- Add link to myCloudogu and regroup items to support (#27)
- Upgrade dependencies

## [v1.2.0](https://github.com/cloudogu/warp-menu/releases/tag/v1.2.0)
### Added
- Menu entry to docs.cloudogu.com (#25)
- Makefile to build zip

## [v1.1.1](https://github.com/cloudogu/warp-menu/releases/tag/v1.1.1)
### Fixed
- Reapplied lost changes in PR (#23)

## [v1.1.0](https://github.com/cloudogu/warp-menu/releases/tag/v1.1.0)
### Fixed
- Generate valid html (#20)
- Gix displayed quotation marks
- Change css to target fixed html (#20)

### Changed
- Enable opening the warp menu by keyboard (#22)
- Replace empty link to create valid HTML (#18)
- Refactor naming of variables to be more verbose (#18)

## [v1.0.4](https://github.com/cloudogu/warp-menu/releases/tag/v1.0.4)
### Fixed
- Escape special characters like 'ö', 'ä', 'ü' (#15)

## [v1.0.3](https://github.com/cloudogu/warp-menu/releases/tag/v1.0.3)
### Fixed
- Fix that the area around the menu button is not clickable

## [v1.0.2](https://github.com/cloudogu/warp-menu/releases/tag/v1.0.2)
### Fixed
- Fix that some dogus affect the design of the warp menu
- Fix that the area around the tooltip is not clickable
- Make the warp menu wider in desktop view

## [v1.0.1](https://github.com/cloudogu/warp-menu/releases/tag/v1.0.1)
### Fixed
- Fix resize issue for large mobile displays

## [v1.0.0](https://github.com/cloudogu/warp-menu/releases/tag/v1.0.0)
### Changed
- Rework warp menu to be able to display more entries

### Added
- Add mobile layout
