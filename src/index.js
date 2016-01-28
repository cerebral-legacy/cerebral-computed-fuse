import search from './chains/search'
import compute from './compute'

export default ({ statePath, options }) => {
  return (module) => {
    module.addState({
      statePath,
      options,
      query: null
    })

    module.addSignals({
      search
    })

    module.addServices({
      fuse: compute(module.name.split('.'))
    })
  }
}
