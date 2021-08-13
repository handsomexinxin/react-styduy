import _Form from './Form';
import Field from './Field';
import {useForm} from './useForm';
import { forwardRef } from 'react';

const Form = forwardRef(_Form);

Form.useForm = useForm
export {
  Field
}

export default Form;