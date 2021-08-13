import { createContext, useContext, useReducer, useLayoutEffect } from 'react';


export function bindActionCreators(creators, dispatch) {
  let obj = {}
  // 核心逻辑
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
  return obj;
}

const bindActionCreator = (creator, dispatch) => {
  return (...args) => dispatch(creator(args))
}

// 通过context传递store
const Context = createContext()


export const Provider = ({ store, children }) => {
  return (<Context.Provider value={store} >
    {children}
  </Context.Provider>)
}


export const connect = (mapStateToProps, mapDispatchToProps) => (Cmp) => props => {
  // 模拟类组件中的forceUpdate   官网推荐   每次调用第二个函数都会执行定义的第一个参数（规则）
  // const [, forceUpdate] = useReducer(x => x + 1, 0)
  // 优雅的使用
  const forceUpdate = useForceUpdate()
  const store = useContext(Context)
  const { getState, dispatch, subscribe } = store;

  const stateProps = mapStateToProps(getState())

  let dispatchProps = {}
  if (typeof mapDispatchToProps === 'object') {
    dispatchProps = {
      dispatch,
      ...bindActionCreators(mapDispatchToProps, dispatch)
    }
  } else if (typeof mapDispatchToProps === 'function') {
    dispatchProps = {
      dispatch,
      ...mapDispatchToProps(dispatch)
    }
  }

  useLayoutEffect(() => {
    const unSubscribe = store.subscribe(() => {
      forceUpdate()
    })
    return () => {
      if (unSubscribe) {
        unSubscribe()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])
  return (
    <Cmp {...props} {...stateProps} {...dispatchProps} />
  )
}

// useDispatch, useSelector

export const useDispatch = () => {
  const store = useContext(Context);
  return store.dispatch;
}

export const useSelector = (selector) => {
  const forceUpdate = useForceUpdate()
  const store = useContext(Context)
  const {getState} = store
  // console.log(store.getState());
  useLayoutEffect(() => {
    const unSubscribe = store.subscribe(() => {
      forceUpdate()
    })
    return () => {
      if (unSubscribe) {
        unSubscribe()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])
  const state = selector(getState())
  return state;
}

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  return forceUpdate;
}

