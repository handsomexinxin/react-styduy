// import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createStore, applyMiddleware, combineReducers} from '../redux/index'
import thunk from '../redux/thunk'
import redux_promise from '../redux/redux-promise';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';
// import redux_promise from 'redux-promise';
export function countReducer(state = 0, action) {
  // console.log('countReducer', state, action);
  switch (action.type) {
    case "ADD":
      return state + (action.payload || 1);
    case "MINUS":
      return state - (action.payload || 1);
    default:
      return state;
  }
}
// logger要作为中间件的最后一个参数  不然不能保证action是一个原始传入的对象
const store = createStore(combineReducers({counter: countReducer}), applyMiddleware(thunk, redux_promise));

function logger({getState, dispatch}) {
  // 使用compose聚合函数之后  每一次会将下一个要执行的中间件操作通过参数传入
  return next => action => {
    console.log('logger', next, action);
    // console.log(next, action, dispatch);
    console.log('+++++++++++++++++++++++++++++');
    const prevState = getState()
    console.log('prev state', prevState);
    // todo 执行聚合函数  后边执行的代码将会是dispatch之后执行
    const returnValue = next(action)
    // 在执行完next之后 再次调用getState将会是执行之后的结果
    const nextState = getState()
    console.log('next state', nextState);
    console.log('+++++++++++++++++++++++++++++');
    // 因为我们使用compose函数   所以需要return数据  这个数据是下一个函数执行时的参数
    return returnValue;
  }
}

// function f1(arg) {
//   console.log('f1', arg);
//   return arg
// }
// function f2(arg) {
//   console.log('f2', arg);
//   return arg
// }
// function f3(arg) {
//   console.log('f3', arg);
//   return arg
// }

// function compose(...args) {
//   if(args.length === 0) {
//     return (arg) => arg
//   }
//   if(args.length === 1) {
//     return args[0]
//   }
//   return args.reduce((a, b) => {
//     return (...args) => a(b(...args))
//   })
// }
// let fn = compose(f1, f2, f3)
// console.log('fn',fn);
// let res = fn('omg')

// console.log(res);

export default store;

