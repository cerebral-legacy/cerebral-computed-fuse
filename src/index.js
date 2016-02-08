import search from './chains/search'
import compute from './compute'

export default ({ statePath, options }) => {
  return (module) => {
    const modulePath = module.name.split('.')

    module.addState({
      statePath,
      options,
      query: null
    })

    module.addSignals({
      search: search(modulePath)
    })

    module.addServices({
      fuse: compute(modulePath),
      queryPath: [...modulePath, 'query']
    })
  }
}
