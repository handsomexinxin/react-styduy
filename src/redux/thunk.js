export default function thunk({getState, dispatch}) {
  return next => action => {
    console.log('thunk', next, action);
    if(typeof action === 'function') {
      //在这里调用action之后  actions内部会调用dispatch  所以会导致所有的中间件重新执行
      return action(dispatch, getState)
    }
    return next(action);
  }
}