export const getNextState = (setState) => {
  return new Promise(resolve => {
    setState(preState => {
      resolve(preState)
      return preState
    })
  })
}