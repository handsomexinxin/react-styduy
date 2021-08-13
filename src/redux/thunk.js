export default function logger({getState, dispatch}) {
  // 使用compose聚合函数之后  每一次会将下一个要执行的中间件操作通过参数传入
  return next => action => {
    // console.log('thunk', next, action);
    if(typeof action === 'function') {
      return action(dispatch, getState)
    }
    // 每次的next就是下一个中间件，通过执行将action传入
    return next(action);
  }
}