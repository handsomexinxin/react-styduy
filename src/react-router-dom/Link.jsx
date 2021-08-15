import React, { useContext } from 'react'
import { Context } from './RouterContext';

export default function Link({to, children, ...rest}) {
  const context = useContext(Context)
  const handleClick = (e) => {
    e.preventDefault();
    context.history.push(`${to}`)
  }
  return (<a href={to} {...rest} onClick={handleClick} >{children}</a>)
}
