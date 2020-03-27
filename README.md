# Service Worker Updater - React Hook & HOC

![npm](https://img.shields.io/npm/v/service-worker-updater) ![npm bundle size](https://img.shields.io/bundlephobia/min/service-worker-updater) ![npm](https://img.shields.io/npm/dm/service-worker-updater) ![NPM](https://img.shields.io/npm/l/service-worker-updater)

This package provides React hook and HOC to check for service worker updates.

## Why would I need that?

If you use service worker in your app and would like to provide nice _new update_ button/notification, it's perfect for you. Service Worker Updater will periodically check for new service worker. If found one, _hasUpdate_ prop is set to true (now you can show something to your users) and use updateHandler() to activate new SW.

Service Workers are self updating by default (when user reopens your app or after some time - depending on browser). When users aren't often reloading the app, they will have old app version. Service Worker Updater = solution for that.

## Installation

```
$ yarn add service-worker-usage
```

## Usage

### Use updater with React Hook

```js
const [hasUpdate, updateHandler] = useSWUpdateChecker(options)
```

Example:

```js
import React from "react"
import { useSWUpdateChecker } from "service-worker-updater"

const CHECK_INTERVAL = 30 * 60 * 1000 // 30 minutes
const UPDATE_ON_NAVIGATE = true // trigger update when changing route/window.location

function UpdateButton() {
  const [hasUpdate, updateHandler] = useSWUpdateChecker({
    checkInterval: CHECK_INTERVAL,
    updateOnLoad: UPDATE_ON_NAVIGATE
  })

  if (!hasUpdate) return null

  return (
    <button
      onClick={() => {
        updateHandler()
      }}
    >
      Update app
    </button>
  )
}
```

### Use updater as HOC (Higher Order Component)

```js
export default withSWUpdateChecker(WrappedComponent, options)
```

Example:

```js
import React from "react"
import PropTypes from "prop-types"
import { withSWUpdateChecker } from "service-worker-updater"

function UpdateButton({ hasUpdate, updateHandler }) {
  if (!hasUpdate) return null

  return (
    <button
      className='updateButton'
      onClick={() => {
        updateHandler()
      }}
    >
      Update app
    </button>
  )
}

const CHECK_INTERVAL = 30 * 60 * 1000 // 30 minutes
const UPDATE_ON_NAVIGATE = true // trigger update when changing route/window.location

export default withSWUpdateChecker(UpdateButton, {
  checkInterval: CHECK_INTERVAL,
  updateOnLoad: UPDATE_ON_NAVIGATE
})

UpdateButton.propTypes = {
  hasUpdate: PropTypes.boolean.isRequired,
  updateHandler: PropTypes.func
}
```

## Do I need to modify my service worker?

Yeah, probably. This package was tested with Gatsby and `gatsby-offline-plugin`, which uses Workbox behind the scenes. To activate new SW, it must trigger `self.skipWaiting()` event.

If you use custom Service Worker, add _message_ event listener to it and handle 'SKIP_WAITING' event:

```js
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
```

## Options

There are only two options:

- **checkInterval** (int) - time in milliseconds how often check for Service Worker updates. _Default: 3600000 (1h)_

- **updateOnLoad** (bool) - activate new service worker on route change? _Default: true_

## How to use it in Gatsby.js?

WIP

## Resources

I definitely recommend reading more about Service Workers lifecycles and their possible states:

- [https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
- [https://bitsofco.de/what-self-skipwaiting-does-to-the-service-worker-lifecycle/](https://bitsofco.de/what-self-skipwaiting-does-to-the-service-worker-lifecycle/)
