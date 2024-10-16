# wik

_A ridiculously simple personal wiki._

Originally implemented in a single 160-line HTML file; now broken into multiple files to make it easier to learn and maintain.

Try it now: [semanticdata.github.io/wik](https://semanticdata.github.io/wik/)

> Bookmark it - it will keep working when you're offline.

![screenshot](/screenshot.png)

## Goals

- Be really, really simple.
- Save all data in browser using [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- No separate 'edit mode' like most wikis. Pages are directly editable.
- Work equally well on mobile and desktop.
- Support browser navigation (back/forward/bookmarks).
- Store all data locally on device.
- Decent keyboard navigation.
- Work offline.

## Changes from Upstream

- Separate into individual HTML, CSS, and JS files.
- Deploy new [demo site](https://semanticdata.github.io/wik/)
- Change links from being defined between parenthesis "(link)" to brackets "[link]".
- Create 'Banana' page initially with minimal content.
- New 'Home' button.
- New 'Info' button with a new 'Usage' section.
- Add MIT License to repository.

## © License

Source code in this repository is available under the [MIT License](LICENSE).
