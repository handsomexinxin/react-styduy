import React, {Component} from "react";
import {Context} from "./RouterContext";
import LifeCycle from './LifeCycle';

export default class Redirect extends Component {
  render() {
    return (
      <Context.Consumer>
        {context => {
          const {history} = context;
          const {to, push = false} = this.props;
          return (
            <LifeCycle
              onMount={() => {
                push ? history.push(to) : history.replace(to);
              }}
            />
          );
        }}
      </Context.Consumer>
    );
  }
}

// class LifeCycle extends Component {
//   componentDidMount() {
//     if (this.props.onMount) {
//       this.props.onMount.call(this, this);
//     }
//   }
//   render() {
//     return null;
//   }
// }
