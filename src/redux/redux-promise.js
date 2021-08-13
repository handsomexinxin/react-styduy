export default function redux_promise({getState, dispatch}) {
  // 使用compose聚合函数之后  每一次会将下一个要执行的中间件操作通过参数传入
  return next => action => {
    // console.log('promise', next, action);
    return isPromise(action)? action.then(dispatch): next(action)
  }
}

function isPromise(action) {
  return action instanceof Promise;
}
