import React, { Component } from 'react'

class HomePage extends Component {
  // static contextType = ThemeContext
  render() {
    // console.log(this);
    const {themeColor} = this.context;
    return (
      <div className="border">
        <h1 style={{color: themeColor}} >HomePage</h1>
      </div>
    )
  }
}

//只能订阅单一的
// HomePage.contextType = ThemeContext

export default HomePage;