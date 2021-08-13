import React, { Component } from 'react'
import { ThemeConsumer, UserConsumer } from './../Context';
import {Button} from 'antd'

export default class ConsumerPage extends Component {
  render() {
    return (
      <div className="border">
        <h1>ConsumerPage</h1>
        <ThemeConsumer>
          {theme => {
            // return <div style={{color: theme.themeColor}}>{theme.themeColor}</div>
            return <UserConsumer>
            {user => {
              return <h1 style={{color: theme.themeColor}}>user: {user.name}</h1>
            }}
          </UserConsumer>
          }}
        </ThemeConsumer>
        <Button type="primary">asf</Button>
      </div>
    )
  }
}
