import React, { Component } from "react";
import Input from "../components/Input";
// import { createForm } from "rc-form";
import { createForm } from "../components/my-rc-form/index";

const nameRules = {required: true, message: '输入账户'}
const passwordRules = {required: true, message: '输入密码'}
class MyRcForm extends Component {
  // state = {
  //   username: "",
  //   password: "",
  // };
  componentDidMount() {
    this.props.form.setFieldsValue({username: 'username'})
  }
  onSubmit = () => {
    const {getFieldsValue, validateFields} = this.props.form;
    // console.log("submit", getFieldsValue());
    validateFields((err, value) => {
      if(err) {
        console.log('失败', err, value);
      }else {
        console.log('成功', err, value);
      }
    })
  };
  render() {
    console.log(this.props);
    const { onSubmit } = this;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h3>MyRcForm</h3>
        {getFieldDecorator('username', {rules: nameRules})(<Input placeholder="username" />)}
        {getFieldDecorator('password', {rules: passwordRules})(<Input placeholder="password" />)}
        <button onClick={onSubmit}>submit</button>
      </div>
    );
  }
}

export default createForm(MyRcForm);
