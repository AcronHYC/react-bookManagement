import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Icon,
  Checkbox,
  message,
  Radio,
  Select
} from "antd";
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AddForm extends Component {
  state = {
    confirmDirty: false,
    addFlag: false
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, dispatch, history, loading, isAddSuccess } = this.props;
    const addLoading = loading.effects["admin/addAdmin"];
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

    const validateAdminName = (rule, value, callback) => {
      let flag = true;
      if ((value && value.length < 6) || (value && value.length > 12)) {
        callback("用户名长度需要在6-12位");
      } else if (value && value.length >= 6 && value.length <= 12) {
        dataSource.map(item => {
          if (item.adminName === value) {
            callback("该用户名已经被使用!");
          }
        });
        if (flag) {
          callback();
        }
      } else {
        callback();
      }
    };

    const validateRealName = (rule, value, callback) => {
      let flag = true;
      if (value) {
        dataSource.map(item => {
          if (item.realName === value) {
            callback("该真实姓名已经被使用!");
          }
        });
        if (flag) {
          callback();
        }
      } else {
        callback();
      }
    };

    const compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入的密码不一致!");
      } else {
        callback();
      }
    };

    const validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if ((value && value.length < 6) || (value && value.length > 12)) {
        callback("密码长度需要在6-12位");
      }
      if (value && this.state.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          dispatch({
            type: "admin/addAdmin",
            payload: values
          });
          message.success("添加管理员成功!");
          this.props.form.resetFields();
          dispatch({
            type: "admin/queryAdminByParams",
            payload: {
              admin: {}
            }
          });
        }
      });
    };

    return (
      <div>
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <FormItem label="用户名" hasFeedback>
            {getFieldDecorator("adminName", {
              rules: [
                { required: true, message: "用户名不能为空!" },
                { validator: validateAdminName }
              ]
            })(<Input placeholder="请输入用户名" style={{ width: "250px" }} />)}
          </FormItem>
          <FormItem label="密码">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "密码不能为空!"
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(
              <Input.Password
                style={{ width: "250px" }}
                placeholder="请输入6-12位密码"
              />
            )}
          </FormItem>
          <FormItem label="确认密码">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "请确认你的密码!"
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                style={{ width: "250px" }}
                placeholder="请再次确认您的密码"
              />
            )}
          </FormItem>
          <FormItem label="真实姓名" hasFeedback>
            {getFieldDecorator("realName", {
              rules: [
                {
                  required: true,
                  message: "真实姓名不能为空!"
                },
                { validator: validateRealName }
              ]
            })(
              <Input style={{ width: "250px" }} placeholder="请输入真实姓名" />
            )}
          </FormItem>
          <FormItem label="性别">
            {getFieldDecorator("sex", {
              initialValue: "male",
              rules: [
                {
                  required: true,
                  message: "性别不能为空!"
                }
              ]
            })(
              <RadioGroup>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="手机号码" hasFeedback>
            {getFieldDecorator("telephone", {
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: "手机号码不能为空!"
                },
                {
                  pattern: new RegExp(/^[0-9]\d*$/, "g"),
                  message: "请输入数字！"
                }
              ]
            })(
              <Input
                style={{ width: "250px" }}
                placeholder="手机号码必须为数字"
              />
            )}
          </FormItem>
          <FormItem label="邮箱" hasFeedback>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "请输入正确格式的邮箱!"
                },
                {
                  required: true,
                  message: "邮箱不能为空!"
                }
              ]
            })(
              <Input
                style={{ width: "250px" }}
                placeholder="请输入正确格式的邮箱"
              />
            )}
          </FormItem>
          <FormItem label="权限">
            {getFieldDecorator("role", {
              initialValue: "3",
              rules: [
                {
                  required: true,
                  message: "权限选择不能为空!"
                }
              ]
            })(
              <Select style={{ width: "250px" }}>
                <Option value="3">普通管理员</Option>
                <Option value="2">高级管理员</Option>
                <Option value="1">超级管理员</Option>
              </Select>
            )}
          </FormItem>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 }
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "250px" }}
              loading={addLoading}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(AddForm));
