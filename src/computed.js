import { Computed } from 'cerebral'
import Fuse from 'fuse.js'

const fuse = Computed(({ modulePath, statePath }) => ({
  options: `${modulePath}.options`,
  state: statePath
}), ({ options, state }) => {
  let values = []
  if (typeof state === 'object') {
    values = Object.keys(state).map((key) => state[key])
  } else if (Array.isArray(values)) {
    values = state
  }
  return new Fuse(values, Object.assign({}, options))
})

export default Computed(({ modulePath, statePath }) => ({
  fuse: fuse({ modulePath, statePath }),
  query: `${modulePath}.query`
}), ({ modulePath, fuse, query }) => fuse.search(query))
