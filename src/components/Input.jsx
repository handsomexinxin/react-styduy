import React, { Component } from 'react'

export default class Input extends Component {
  render() {
    const { placeholder, value, onChange } = this.props
    return (
      <div>
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e)}  />
      </div>
    )
  }
}
