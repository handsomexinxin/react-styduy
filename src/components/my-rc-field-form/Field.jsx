import { cloneElement, Component } from 'react'
import FieldContext from './FieldContext';

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unRegisterEntities =this.context.registerEntities(this);
  }
  componentWillUnmount() {
    this.unRegisterEntities()
  }
  onStoreChange = () => {
    this.forceUpdate()
  }
  getControlled = () => {
    const {getFieldValue, setFieldValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name) || '',
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldValue({[name]: newValue})
      }
    }
  }
  render() {
    const { children } = this.props;
    return cloneElement(
      children, this.getControlled()
    )
  }
}
