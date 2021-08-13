import React, { useState } from 'react'
import PopUp from './../components/PopUp';
import {Button} from 'antd'

export default function PopUpPage() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <h1>PopUpPage</h1>
      <Button onClick={() => setShow(!show)} >切换</Button>
      {show && <PopUp/>}
    </div>
  )
}
