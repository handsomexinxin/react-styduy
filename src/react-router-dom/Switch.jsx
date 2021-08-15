import React, { useContext } from "react";
import { Context } from "./RouterContext";
import matchPath from "./matchPath";

// 渲染当前地址匹配的第一个子节点<Route>或者<Redirect>
export default function Switch(props) {
  const { children } = props;
  const context = useContext(Context);
  // return
  const location = props.location || context.location;
  let match;
  let element;
  React.Children.forEach(children, (child) => {
    if (match == null && React.isValidElement(child)) {
      element = child;
      match = child.props.path
        ? matchPath(location.pathname, child.props)
        : context.match;
    }
  });
  return match? React.cloneElement(element, {computedMatch: match}): null
}
