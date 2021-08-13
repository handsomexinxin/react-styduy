import { Button } from 'antd'
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch, useSelector } from '../reactRedux'

const ReactReduxHooksPage = () => {
  const counter = useSelector(({counter}) => counter)
  const dispatch = useDispatch()
  const add = () => {
    dispatch({type: 'ADD'})
  }
  return (
    <div>
      <h1>ReactReduxHooksPage</h1>
      <p>{counter}</p>
      <Button onClick={add}>按钮</Button>
    </div>
  )
}

export default ReactReduxHooksPage