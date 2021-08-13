import { useRef } from "react";

// 存储form的数据
class FormStore {
  constructor() {
    // 这里存储form要处理的数据
    this.store = {}
    this.fieldEntities = {}
    this.callbacks = {}
  }
  setCallback = (callback) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    }
  }
  registerEntities = (entity) => {
    const {name} = entity.props;
    this.fieldEntities = {
      ...this.fieldEntities,
      [name]: entity
    }
    // 取消写在组件的注册
    return () => {
      delete this.fieldEntities[name];
    }
  }
  setFieldValue = (nameStore) => {
    this.store = {
      ...this.store,
      ...nameStore
    }
    Object.keys(nameStore).forEach(entity => {
      this.fieldEntities[entity].onStoreChange()
    })
  }
  getFieldValue = (name) => {
    const value = this.store[name] || undefined
    return value
  }
  validate = () => {
    let err = [];
    Object.keys(this.fieldEntities).forEach(key => {
      const entity = this.fieldEntities[key]
      const {rules} = entity.props
      const rule = rules && rules[0]
      const value = this.getFieldValue(key)
      if(rule && rule.required && !value) {
        err.push({
          [key]: rule.message
        })
      }
    })
    return err;
  }
  submit = () => {
    const {onFinish, onFinishFailed} = this.callbacks
    let err = this.validate()
    if(err.length === 0) {
      // console.log('成功');
      onFinish && onFinish({...this.store})
    }else {
      // console.log('‘失败');
      onFinishFailed && onFinishFailed(err, this.store)
    }
  }
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      registerEntities: this.registerEntities,
      submit: this.submit,
      setCallback: this.setCallback,
    }
  }
}

export const useForm = (form) => {
  const formRef = useRef();

  if (!formRef.current) {
    const formStore = new FormStore().getForm();
    formRef.current = formStore;
  }


  return [formRef.current]
}