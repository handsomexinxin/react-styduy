import "./App.less";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   useHistory,
//   useLocation,
//   useRouteMatch,
//   useParams,
//   Prompt
// } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  WithRouter,
  Prompt
} from "./react-router-dom";
import HomePage from "./routerPages/HomePage";
import UserPage from "./routerPages/UserPage";
import LoginPage from "./routerPages/LoginPage";
import _404Page from "./routerPages/_404Page";
import { Component } from 'react';
import { useState } from 'react';
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>
        <Switch>
          <Route
            exact
            path="/"
            // children > component > render  //todo 在没有switch情况下render匹配与否都会展示   component与render则会只有匹配的情况下才会展示
            // ! 注意事项：在component内部是使用createElement所以每次会创建新的组件 是生命周期componentDidMount与componentWillUnMount多次调用，而render和children则不会
            // children={() => <div className="border">Children Page</div>}
            component={HomePage}
            render={() => <div className="border">Render Page</div>}
          />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/product/:id"
            // component={Product}
            render={() => <Product />}
          />
          <Route path="/user" component={UserPage} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

const Product = (props) => {
  // console.log("props", props);
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const params = useParams();
  // console.log("produceProps", history, location, match, params);
  const { id } = params;
  // const { match } = props
  const { url } = match;
  // const { id } = match.params;

  return (
    <div className="border">
      {url}
      <h1>Product: {id}</h1>
      <Link to={url + "/detail"}>详情</Link>
      <Route path={url + "/detail"} component={Detail} />
      {/* <Detail /> */}
    </div>
  );
};
const Detail = (props) => {
  const [isPrompt, setIsPrompt] = useState(true)
  return (
    <div className="border">
      <h1>detail: 
        {props.match.params.id}
      </h1>
      <button onClick={() => {setIsPrompt(!isPrompt)}} >点击{isPrompt.toString()}</button>
      <Prompt when={isPrompt}
        message={(location) => {
          console.log(location);
          return `是否要退出Prompt`
        }}
      ></Prompt>
    </div>
  );
};
// @WithRouter
// class Detail extends Component {
//   render() {
//     console.log('detail', this.props);
//     return (
//       <div>
//         <h1>Detail</h1>
//       </div>
//     )
//   }
// }

export default App;
