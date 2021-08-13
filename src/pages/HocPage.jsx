import React, { Component } from 'react'


const foo = (Cmp) => (props) => {
  return <div className="border">
    <Cmp {...props} />
  </div>
}

// const Child = (props) => {
//   return <div >child-{props.name}</div>
// }
// const Foo = foo(foo(Child))
@foo
@foo
@foo
@foo
@foo
class Child extends Component {
  render() {
  return <div >child-{this.props.name}</div>
  }
}
// 使用需要的装饰器依赖
export default class HocPage extends Component {
  render() {
    return (
      <div>
        {/* <Foo name={'xiaoqiang'} /> */}
        <Child name={'小明'} />
      </div>
    )
  }
}
