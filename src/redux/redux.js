const createStore = (reducer, enhancer) => {
  if(enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState
  let currentListens = []
  const getState = () => {
    return currentState
  }
  const dispatch = (action) => {
    currentState = reducer(currentState, action)
    // state发生变化通知组件
    currentListens.forEach(fn => fn())
  }
  const subscribe = (callback) => {
    currentListens.push(callback)
    let length = currentListens.length - 1;
    return () => {
      currentListens.splice(length, 1);
    }
  }
  // 手动触发，派发初始值
  dispatch({type:"REDUX/XXXXXXXXXX"})
  return {
    getState,
    dispatch,
    subscribe
  }
};

export default createStore
