# Toasted Notes

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A super simple but flexible implementation of toast style notifications for React, initially based on the excellent implementation found in [Evergreen](https://github.com/segmentio/evergreen). [View the demo and documentation](https://toasted-notes.netlify.com/)

Install:

```
yarn add toasted-notes
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

# Example

```
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const HelloWorld = () => (
  <button onClick={() => {
    toaster.notify('Hello world', {
      duration: 2000
    })
  }}>
    Say hello
  </button>
)
```

# API

The notify function accepts either a string, a react node, or a render callback.

```
// using a string
toaster.notify('With a simple string')

// using jsx
toaster.notify(<div>Hi there</div>)

// using a render callback
toaster.notify(({ onClose }) => (
  <div>
    <span>My custom toaster</span>
    <button onClick={onClose}>Close me please</button>
  </div>
))
```

It also accepts options.

```
toaster.notify('Hello world', {
  position: 'bottom-left', // top-left, top, top-right, bottom-left, bottom, bottom-right
  duration: null // This notification will not automatically close
})
```
