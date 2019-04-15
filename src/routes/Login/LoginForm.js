import React, { Component } from "react";
import { Button, Form, Input, Icon, Checkbox, message } from "antd";
import QueueAnim from "rc-queue-anim";
import { isAuthenticated, setSessionStorage } from "../../utils/session";
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, dispatch, history, loading } = this.props;

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        dispatch({
          type: "login/login",
          payload: values,
          callback: res => {
            console.log(res);
            if (res.error) {
              message.error(res.error);
            } else {
              setSessionStorage("loginUser", JSON.stringify(res.loginUser));
              localStorage.setItem("token", res.token);
              history.push("/");
              message.success("登录成功!");
            }
          }
        });
      });
    };

    return (
      <div>
        <h3 style={{ color: "grey" }}>管理员登录</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator("adminName", {
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading.effects["login/login"]}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <h5 style={{ color: "grey" }}>欢迎登陆网上图书管理系统</h5>
      </div>
    );
  }
}

export default withRouter(Form.create()(LoginForm));
