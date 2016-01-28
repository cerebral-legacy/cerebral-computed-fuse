import search from './chains/search'
import compute from './compute'

export default ({ statePath, options }) => {
  return module => {
    module.addState({
      statePath,
      options,
      query: null
    })

    module.addSignals({
      search
    })

    const modulePath = module.name.split('.')
    module.addServices({
      fuse: compute(modulePath),
      queryPath: [...modulePath, 'query']
    })
  }
}
