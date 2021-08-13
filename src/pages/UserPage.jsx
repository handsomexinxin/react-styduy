import React, { useContext } from 'react'
import { ThemeContext, UserContext } from '../Context'

export default function UserPage() {
  const ctx = useContext(ThemeContext)
  const user = useContext(UserContext)
  console.log(ctx);
  return (
    <div className="border">
      <h1 style={{color: ctx.themeColor}} >UserPage</h1>
      <p>user: {user.name}</p>
    </div>
  )
}
