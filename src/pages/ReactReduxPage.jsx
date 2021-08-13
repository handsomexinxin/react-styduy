import React, { Component } from 'react'
// import {connect} from 'react-redux'
import { Button } from 'antd';
// import { bindActionCreators } from 'redux';
import { bindActionCreators, connect } from './../reactRedux/index';

@connect(
  ({counter}) => ({counter}),
  // {
  //   add: () => ({type: 'ADD'}),
  //   minus: () => ({type: 'MINUS'})
  // },
  (dispatch) => {
    let creators = {
      add: () => ({type: 'ADD'}),
      minus: () => ({type: 'MINUS'})
    }
    // 这个函数的作用是给结构出来的对象的返回结果加一层第二个参数
    creators = bindActionCreators(creators, dispatch);
    return {
      dispatch,
      ...creators
    }
  },
)
class ReactReduxPage extends Component {
  render() {
    const {counter, dispatch, add, minus} = this.props;
    console.log(this.props);
    return (
      <div>
        <h1>ReactReduxPage</h1>
        <p>{counter}</p>
        <Button onClick={() => {dispatch({type: 'ADD'})}} >on Click dispatch add</Button>
        <Button onClick={add} >add</Button>
        <Button onClick={minus} >minus</Button>
      </div>
    )
  }
}

export default ReactReduxPage;
