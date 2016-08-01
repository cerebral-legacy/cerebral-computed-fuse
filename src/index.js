import search from './chains/search'
import computed from './computed'

export default ({ statePath, options }) => {
  return (module) => {
    const modulePath = module.name

    module.addState({
      options,
      query: null
    })

    module.addSignals({
      search: search(modulePath)
    })

    module.addServices({
      get: (state) => state.computed(computed({ modulePath, statePath }))
    })
  }
}
