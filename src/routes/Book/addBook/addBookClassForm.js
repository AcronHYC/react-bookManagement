import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Icon,
  Checkbox,
  message,
  Radio,
  Select,
  Modal
} from "antd";
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;

class AddBookClassForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      dataSource,
      dispatch,
      history,
      loading,
      isAddSuccess,
      bookClassList
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const validateBookClassName = (rule, value, callback) => {
      let flag = true;
      if (value) {
        bookClassList.map(item => {
          if (item.class_name === value) {
            callback("该分类已经被使用!");
          }
        });
        if (flag) {
          callback();
        }
      } else {
        callback();
      }
    };
    return (
      <Form {...formItemLayout}>
        <FormItem label="分类名称">
          {getFieldDecorator("class_name", {
            rules: [
              { required: true, message: "分类名称不能为空!" },
              { validator: validateBookClassName }
            ]
          })(<Input placeholder="请输入分类名称" style={{ width: "200px" }} />)}
        </FormItem>
      </Form>
    );
  }
}

const BookClassForm = Form.create()(AddBookClassForm);

export default BookClassForm;
