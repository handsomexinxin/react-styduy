export default function combineReducers(reducers) {
  return (state = {}, action) => {
    let nextState = {}
    let hasChanged = false
    Object.keys(reducers).forEach(item => {
      let reducer = reducers[item]
      // console.log(state);
      nextState[item] = reducer(state[item], action)
      hasChanged = hasChanged || nextState[item] !== state[item]
    })
    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length
    return nextState;
  }
}
