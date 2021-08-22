import Component from "./react/Component";
import ReactDOM, {useState} from "./react/react-dom";
// import ReactDOM from 'react-dom';
// import {Component, useState} from 'react'
import "./index.css";
// import store from './store/index'
// hooks为什么只可以在最顶层或者hooks中使用？
// 因为在hook的初始化中，被函数组件存在当前组件的fiber，在挂在fiber上时会以链接的状态保存，所以需要保持顺序
// 在更新时，hooks只和顺序相关需要保证顺序不能乱，在if else中无法保证顺序稳定，进而无法保证准确性

export default class ClassComponent extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="border">
        <h1>{name}</h1>
      </div>
    );
  }
}
// console.log(ClassComponent.prototype.isReactComponent);

const FunctionComponent = (props) => {
  const [state, setState] = useState(0)
  return (
    <div className="border">
      <p className='border' onClick={() => {
        console.log('state', state);
        setState(state + 1)
      }} >{state + ''}</p>
      <h1>{props.name}</h1>
      {state % 2 ?<p>{props.name}</p>:<span>omg</span>}
    </div>
  );
};

const jsx = (
  <div id="xxx" className="border">
    {/* <input type="text" /> */}
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    <p>test</p>
    <h1>h1Test</h1>
    <div className="border">
      <p>test</p>
      <h1>h1Test</h1>
      <ul>
        <li>123</li>
        <li>123</li>
      </ul>
    </div>
  </div>
);

// {/* <FunctionComponent name="函数组件" />
// <ClassComponent name="类组件" />
// <ul>
//   {
//     [1, 2, 3].map(item => (
//       <h1>
//         <li>{item}</li>
//         <li>{item}</li>
//       </h1>
//     ))
//   }
//   <>
//     <li>1123</li>
//     <li>1123</li>
//   </>
// </ul> */}

ReactDOM.render(jsx, document.getElementById("root"));
