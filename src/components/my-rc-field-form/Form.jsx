import React, { useImperativeHandle } from 'react'
import FieldContext from './FieldContext';
import { useForm } from './useForm';
import { useEffect } from 'react';

export default function Form({children, onFinish, onFinishFailed}, ref) {
  const [formInstance] = useForm(ref)
  useImperativeHandle(ref, () => (formInstance));

  useEffect(() => {
    formInstance.setCallback({
      onFinish,
      onFinishFailed
    })
  }, [formInstance, onFinish, onFinishFailed])

  const onSubmit = (e) => {
    e.preventDefault()
    formInstance.submit()
  }
  return (
    <form onSubmit={onSubmit} >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}
