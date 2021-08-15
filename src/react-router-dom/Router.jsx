import React from 'react'
import { Context } from './RouterContext';
import { useState } from 'react';
import { useLayoutEffect } from 'react';

export default function Router(props) {
  const {history, children} = props
  const [location, setLocation] = useState(history.location)
  const computeRootMatch = (pathname) => {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/'
    }
  }

  useLayoutEffect(() => {
    // 监听url变化
    const unListen = history.listen(location => {
      // 修改state刷新context并引起更新
      setLocation(location)
    })
    return () => {
      // 取消监听
      unListen()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{history, location, match: computeRootMatch(location.pathname)}}>
      {children}
    </Context.Provider>
  )
}
