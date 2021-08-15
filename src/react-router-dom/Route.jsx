import React, { useContext } from "react";
import { useReducer } from "react";
import { Context } from "./RouterContext";
import matchPath from "./matchPath";

export default function Route(props) {
  const { path, children, component, render, computedMatch } = props;
  const context = useContext(Context);
  const { location } = context;
  // 判断当前组件的path是否与url对应
  // const match = location.pathname === path
  // 有path时计算path，没有path时则使用context传入的patch  在没有写path时是无论如何都会匹配到
  // switch传入的match优先级更高
  const match = computedMatch
    ? computedMatch
    : path
    ? matchPath(location.pathname, props)
    : context.match;
  // 对应则返回组件  否则返回bull
  // return match? React.createElement(component): null;
  const componentProps = {
    ...context,
    match,
  };
  // 路由匹配情况
  // 在渲染组件时更新match...使组件可以拿到最新的路由相关
  return <Context.Provider value={componentProps}>
    {match
      ? children
        ? typeof children === "function"
          ? children(props)
          : children
        : component
        ? React.createElement(component, componentProps)
        : render
        ? render(props)
        : null
      : typeof children === "function"
      ? children(props)
      : null}
  </Context.Provider>;
  // if (match) {
  //   // 路由匹配 判断是否有children（children优先级最高）
  //   if (children) {
  //     // 是一个函数则执行，否则直接返回
  //     return typeof children === "function"
  //       ? children(componentProps)
  //       : children;
  //     // children不存在则判断component是否存在
  //   } else if (component) {
  //     return React.createElement(component, componentProps);
  //     // component不存在则判断render是否存在
  //   } else if (render) {
  //     return render();
  //   } else {
  //     // 此route组件没有children，component，render，则返回null
  //     return null;
  //   }
  // } else {
  //   // 路由不匹配情况下，查看是否有children，并且是个函数，则执行函数返回，否则返回null
  //   return typeof children === "function" ? children(componentProps) : null;
  // }
}

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
};
