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
import {
  logout,
  isAuthenticated,
  setSessionStorage
} from "../../../utils/session";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class UpdateForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    disabledSelect: true,
    loginUser: {}
  };

  componentDidMount() {
    let loginUser = JSON.parse(isAuthenticated("loginUser"));
    if (loginUser.role === "1") {
      this.setState({
        disabledSelect: false
      });
    }
    this.props.dispatch({
      type: "admin/queryAdminById",
      payload: {
        uuid: JSON.parse(isAuthenticated("loginUser")).uuid
      },
      callback: res => {
        if (res) {
          this.setState({
            loginUser: res
          });
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, dispatch, history, loading } = this.props;
    let updateLoading = loading.effects["admin/updateAdmin"];
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
          if (
            item.adminName === value &&
            value !== this.state.loginUser.adminName
          ) {
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
          if (
            item.realName === value &&
            value !== this.state.loginUser.realName
          ) {
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

    const validateOldPwd = (rule, value, callback) => {
      if (
        (value === "" || value === undefined || value === null) &&
        (this.props.form.getFieldValue("password") !== "" &&
          this.props.form.getFieldValue("password") !== undefined &&
          this.props.form.getFieldValue("password") !== null)
      ) {
        callback("你输入了新密码，请确认旧密码是否正确！");
      } else if (value && value !== this.state.loginUser.password) {
        callback("旧密码不正确！");
      } else {
        callback();
      }
    };

    const compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (
        value !== form.getFieldValue("password") &&
        (this.props.form.getFieldValue("password") !== "" &&
          this.props.form.getFieldValue("password") !== undefined &&
          this.props.form.getFieldValue("password") !== null)
      ) {
        callback("两次输入的密码不一致!");
      } else {
        callback();
      }
    };

    const validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if ((value && value.length < 6) || (value && value.length > 12)) {
        callback("密码长度需要在6-12位");
      } else if (
        value === this.state.loginUser.password &&
        value &&
        value.length >= 6 &&
        value.length <= 12
      ) {
        callback("新密码与旧密码不能相同");
      }
      if (value && this.state.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    };

    const handleReset = e => {
      e.preventDefault();
      this.props.form.resetFields();
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log(values);
        if (!err) {
          values["uuid"] = this.state.loginUser.uuid;
          dispatch({
            type: "admin/updateAdmin",
            payload: values,
            callback: res => {
              if (res) {
                if (values.password === undefined || values.password === "") {
                  values.password = this.state.loginUser.password;
                }
                if (values.adminName !== this.state.loginUser.adminName) {
                  message.warn("您的用户名已经修改，需要重新登录！");
                  localStorage.clear();
                  logout();
                  history.push("/login");
                } else if (values.role !== this.state.loginUser.role) {
                  message.warn("您的权限已经修改，需要重新登录！");
                  localStorage.clear();
                  logout();
                  history.push("/login");
                } else if (values.password !== this.state.loginUser.password) {
                  message.warn("您的密码已经修改，需要重新登录！");
                  localStorage.clear();
                  logout();
                  history.push("/login");
                } else {
                  message.success("修改个人资料成功!");
                  this.setState({
                    loginUser: values
                  });
                  dispatch({
                    type: "admin/queryAdminByParams",
                    payload: {
                      admin: {}
                    }
                  });
                  this.props.form.resetFields();
                }
              }
            }
          });
        }
      });
    };

    return (
      <div>
        <Form {...formItemLayout} onReset={handleReset} onSubmit={handleSubmit}>
          <FormItem label="用户名" hasFeedback>
            {getFieldDecorator("adminName", {
              initialValue: this.state.loginUser.adminName,
              rules: [
                { required: true, message: "用户名不能为空!" },
                { validator: validateAdminName }
              ]
            })(<Input placeholder="请输入用户名" style={{ width: "250px" }} />)}
          </FormItem>
          <FormItem label="旧密码">
            {getFieldDecorator("old_password", {
              rules: [
                {
                  validator: validateOldPwd
                }
              ]
            })(
              <Input.Password
                style={{ width: "250px" }}
                placeholder="请输入旧密码"
              />
            )}
          </FormItem>
          <FormItem label="新密码">
            {getFieldDecorator("password", {
              rules: [
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
              initialValue: this.state.loginUser.realName,
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
              initialValue: this.state.loginUser.sex,
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
              initialValue: this.state.loginUser.telephone,
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
              initialValue: this.state.loginUser.email,
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
              initialValue: this.state.loginUser.role,
              rules: [
                {
                  required: true,
                  message: "权限选择不能为空!"
                }
              ]
            })(
              <Select
                style={{ width: "250px" }}
                disabled={this.state.disabledSelect}
              >
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
              loading={updateLoading}
            >
              修改
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 }
            }}
          >
            <Button type="primary" htmlType="reset" style={{ width: "250px" }}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(UpdateForm));
