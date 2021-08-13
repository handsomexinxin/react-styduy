import React, { useReducer } from 'react'
import { countReducer } from './../store/index';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';

const initArg = (init) => {
  console.log('init', init);
  return init - 0
}

// reducer是用来定义规则的
export default function HooksPage() {
  // 第一个参数是规则  第二个参数是初始值  第三个参数是可选的，是用来加工初始值  只会在初始化时使用一次
  // useState的替代方案 作用域只在当前组件内   在state处理相对复杂的时候使用useReducer   但是不能处理异步
  const [state, dispatch] = useReducer(countReducer, '0', initArg)
  useEffect(() => {
    console.log('useEffect');
    return () => {
      console.log('will unMont');
    }
  }, [state])

  // 和useEffect基本相同  唯一的区别就是执行顺序
  // useEffect是延迟的，是在组件渲染到屏幕之后延迟执行，useLayoutEffect时没有延迟的  在刷新之后同步执行
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    return () => {
      console.log('will unMont useLayoutEffect');
    }
  }, [state])
  return (
    <div>
      <h1>HooksPage</h1>
      <button onClick={() => dispatch({type: "ADD"})} >{state}</button>
    </div>
  )
}
