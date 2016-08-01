# cerebral-module-fuse

A cerebral module that adds fuzzy search to data in the store.

## Install

```
npm install cerebral-module-fuse
```

## Usage

From your main.js

```js
import controller from './controller'
import fuse from 'cerebral-module-fuse'

controller.modules({
  findUsers: fuse({
    statePath: 'users',  // statePath should point to either an object or array in the store
    options: { keys: ['firstName', 'lastName'] } // options are passed on to fuse.js
  })
})
```

> See [fuse docs](https://github.com/krisk/Fuse) for more information about available options.

from your component.js

```js
import React from 'react'
import { connect } from 'cerebral-view-react'
import fuse from 'cerebral-module-fuse/computed'

export default connect({
  users: fuse({ modulePath: 'findUsers', statePath: 'users' })
}, ({ users }) => (
  <ul>
    {users.map(user => (
      <li>{`${user.firstName} ${user.lastName}`}</li>
    ))}
  </ul>
))
```

to execute the search simply call the `search` signal and the view will automatically update

```js
signals.findUsers.search({ query: 'John' })
```

you can also access the filtered data from an action via the provided service

```js
export default myAction({ state, services: { findUsers } }) {
  const users = findUsers.get(state)
}
```

## Contribute

Fork repo

* `npm install`
* `npm start` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es2015 to es5
