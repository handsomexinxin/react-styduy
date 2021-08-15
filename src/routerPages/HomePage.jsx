import React from 'react'
import { Redirect } from '../react-router-dom'

export default function HomePage() {
  return <Redirect to="/welcome" />
  // return (
  //   <div className="border">
  //     <h1>HomePage</h1>
  //   </div>
  // )
}
