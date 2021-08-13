import React, { Component } from 'react'
import { ThemeProvider } from '../Context';
import HomePage from './HomePage';
import UserPage from './UserPage';
import { UserProvider } from './../Context';
import ConsumerPage from './ConsumerPage';


export default class ContextPage extends Component {
  state = {
    theme: {
      themeColor: 'red'
    },
    user: {
      name: '小明'
    }
  }
  handleContext = () => {
    const {theme} = this.state
    this.setState({
      theme: {
        themeColor: theme.themeColor === 'red'? 'green': 'red' 
      }
    })
  }
  render() {
    const {handleContext} = this
    const {theme, user} = this.state
    return (
      <div>
        <button onClick={handleContext}>变</button>
        <ThemeProvider value={theme} >
          <UserProvider value={user}>
            <HomePage/>
            <UserPage/>
            <ConsumerPage/>
          </UserProvider>
        </ThemeProvider>
        {/* {theme.themeColor} */}
      </div>
    )
  }
}
