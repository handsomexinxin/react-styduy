const applyMiddleware = (...middlewares) => {
  return createStore => reducer => {

    // 拿到store(store中有getState,dispatch,subscribe)
    const store = createStore(reducer);

    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState,
      // 因为中间件不止一个，如果传入dispatch的话会可能会互相干扰
      // 作为函数传入会使dispatch之后是一个经过层层封装的dispatch，各个中间件不会相互影响
      dispatch: (action) => {
        return dispatch(action)
      }
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi))

    // 重新赋值一个函数 因为中间件不止一个  所以需要像洋葱模型一样执行 在最后一个中间件收到的参数将是传入的store.dispatch
    dispatch = compose(...middlewareChain)(store.dispatch)
    // console.log('dispatchdispatchdispatch', dispatch);

    // 使dispatch可以接收函数
    return {
      ...store,
      dispatch
    }
  }
}
function compose(...args) {
  if(args.length === 0) {
    return (arg) => arg
  }
  if(args.length === 1) {
    return args[0]
  }
  return args.reduce((a, b) => {
    return (...args) => a(b(...args))
  })
}

export default applyMiddleware;
