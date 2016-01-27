# cerebral-module-fuse

> This module is currently a work in progress

A cerebral module that adds fuzzy search to data in the store.

## Install

```
npm install cerebral-module-fuse
```

## Usage

From your main.js

```js
// your cerebral controller
import controller from './controller'

import fuse form 'cerebral-module-fuse'

// configure modules
const modules = {
  matchedUsers: fuse({
    statePath: ['users'],  // statePath should point to either an object or array in the store
    options: { keys: ['firstName', 'lastName'] } // options are passed on to fuse.js
  })
}

// init the modules
controller.modules(modules)
```

> See [fuse docs](https://github.com/krisk/Fuse) for more information about available options.

from your action.js

```js
export default function findUser ({ input: { name }, services: { matchedUsers } }) {
  matchedUsers.find(name)
}
```

the module state will now contain all matching users under `['matchedUsers']`

## Contribute

Fork repo

* `npm install`
* `npm start` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es6 to es5
