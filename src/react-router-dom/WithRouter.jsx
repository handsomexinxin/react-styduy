import { Context } from "./RouterContext"

const WithRouter = (Cmp) => (props) => {
  return <Context.Consumer>
    {
      context => <Cmp {...props} {...context} />
    }
  </Context.Consumer>
}

export default WithRouter;
