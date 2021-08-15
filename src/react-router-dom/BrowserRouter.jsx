import React, { Component } from 'react'
import { useState } from 'react';
import {createBrowserHistory} from 'history'
import Router from './Router';
export default function BrowserRouter(props) {
  const {children} = props
  const [history] = useState(createBrowserHistory())
  return <Router history={history} children={children} />
}

// export default class BrowserRouter extends Component {
//   render() {
//     return (
//       <div>
//         {}
//       </div>
//     )
//   }
// }


