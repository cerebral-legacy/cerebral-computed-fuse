import Fuse from 'fuse.js'

const dataSet = (dataPath, options) => {
  const compute = get => {
    let values = get(dataPath)
    if (typeof values === 'object') {
      values = Object.keys(values).map(key => values[key])
    } else if (!Array.isArray(values)) {
      values = []
    }
    return new Fuse(values, Object.assign({}, options))
  }
  compute.computedRef = JSON.stringify({ name: 'dataset', dataPath, options })
  return compute
}

export default modulePath => {
  const compute = get => {
    const state = get(modulePath)
    if (state.query && state.statePath) {
      const fuse = get(dataSet(state.statePath, state.options))
      return fuse.search(state.query)
    }
    return []
  }
  compute.computedRef = JSON.stringify({ name: 'fuse', modulePath })
  return compute
}
