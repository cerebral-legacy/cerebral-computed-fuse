export default ({ input: { query }, module }) => {
  module.state.set('query', query)
}
