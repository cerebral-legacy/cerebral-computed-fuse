import { Computed } from 'cerebral'
import Fuse from 'fuse.js'

const fuse = Computed(({ dataPath }) => ({
  data: dataPath
}), ({ data, options }) => {
  let values = []
  if (typeof data === 'object') {
    values = Object.keys(data).map((key) => data[key])
  } else if (Array.isArray(values)) {
    values = data
  }
  return new Fuse(values, Object.assign({}, Array.isArray(options) ? { keys: options } : options))
})

const query = Computed(({ dataPath, queryPath, options }) => ({
  fuse: fuse({ dataPath, options }),
  query: queryPath
}), ({ fuse, query }) => fuse.search(query))

export default (dataPath, queryPath, options) => query({ dataPath, queryPath, options })
