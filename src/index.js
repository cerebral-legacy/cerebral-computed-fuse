import search from './chains/search'
import compute from './compute'

export default ({ statePath, options }) => {
  return (module) => {
    module.state({
      statePath,
      options,
      query: null
    })

    module.signals({
      search
    })

    module.services({
      fuse: compute(module.path)
    })
  }
}
