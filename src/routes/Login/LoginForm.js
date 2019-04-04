import React, { Component } from "react";
import { Button, Form, Input, Icon, Checkbox, message } from "antd";
import QueueAnim from "rc-queue-anim";
import {
  isAuthenticated,
  authenticateSuccess,
  logout
} from "../../utils/cookie";

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, dispath, history } = this.props;

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        dataSource.map(item => {
          if (
            item.adminName === values.adminName &&
            item.password === values.password
          ) {
            let loginUser = item;
            authenticateSuccess(loginUser);
            this.props.history.push("/");
          }
        });
        message.error("用户名或密码错误!");
      });
    };

    return (
      <div>
        <h3>管理员登录</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
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
          <Form.Item>
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
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
