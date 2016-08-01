export default (modulePath) => {
  const queryPath = `${modulePath}.query`

  return ({ input: { query }, state }) => {
    state.set(queryPath, query)
  }
}
