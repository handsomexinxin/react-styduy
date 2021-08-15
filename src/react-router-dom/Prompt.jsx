import { useContext } from 'react';
import { Context } from './RouterContext';
import LifeCycle from './LifeCycle';

export default function Prompt(props) {
  const {when = true, message} = props
  const context = useContext(Context)
  // return null;
  if(when) {
    let method = context.history.block;
    return <LifeCycle onMount={(self) => {
      self.release = method(message)
    }} />
  }
  return null;
}
