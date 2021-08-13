import React, { Component } from "react";

export const createForm = (Cmp) => {
  return class extends Component {
    state = {};
    options = {};
    getFieldDecorator = (field, options) => (InputCmp) => {
      this.options[field] = options;
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || "",
        onChange: (e) => {
          this.handleChange(e, field);
        },
      });
    };
    handleChange = (e, name) => {
      const { value } = e.target;
      console.log(e);
      this.setState({ [name]: value });
    };
    validateFields = (callback) => {
      let err = [];
      for (const field in this.options) {
        const value = this.state[field];
        const rules = this.options[field].rules;
        if (rules.required) {
          if (!!!value) {
            err.push({ [field]: rules.message });
          }
        }
      }
      if (err.length === 0) {
        callback(null, this.state);
      } else {
        callback(err, this.state);
      }
    };
    getFieldsValue = () => {
      return this.state;
    };
    setFieldsValue = (newState) => {
      this.setState(newState);
    };
    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          getFieldsValue: this.getFieldsValue,
          setFieldsValue: this.setFieldsValue,
          validateFields: this.validateFields,
        },
      };
    };
    render() {
      return <Cmp {...this.props} {...this.getForm()} />;
    }
  };
};
