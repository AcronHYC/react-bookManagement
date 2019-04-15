import React, { Component } from "react";
import { Button, Form, Row, Col, Select, Input } from "antd";
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;
const Option = Select.Option;

class Filter extends Component {
  state = {
    selectedKey: "adminName",
    isEmpty: true
  };
  render() {
    const { dispatch, loading, inputCallback, selectCallback } = this.props;
    const { getFieldDecorator } = this.props.form;

    const onSelectChange = value => {
      this.setState({
        selectedKey: value
      });
    };

    const select = (
      <Select onChange={onSelectChange} defaultValue="adminName">
        <Option value="adminName">用户名</Option>
        <Option value="realName">真实姓名</Option>
        <Option value="sex">性别</Option>
        <Option value="telephone">手机号码</Option>
        <Option value="email">邮箱</Option>
        <Option value="roleName">权限</Option>
      </Select>
    );

    const resetFields = e => {
      e.preventDefault();
      this.props.form.resetFields();
      inputCallback("");
      dispatch({
        type: "admin/queryAdminByPage",
        payload: {}
      });
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log(
          "key:" + this.state.selectedKey + ",value:" + values.filterValue
        );
        if (values.filterValue !== undefined && values.filterValue.length > 0) {
          selectCallback(this.state.selectedKey);
          inputCallback(values.filterValue);
          let jsonString =
            '{"' + this.state.selectedKey + '":"' + values.filterValue + '"}';
          let jsonObject = JSON.parse(jsonString);
          dispatch({
            type: "admin/queryAdminByFuzzyAndPage",
            payload: jsonObject
          });
        } else {
          inputCallback("");
          dispatch({
            type: "admin/queryAdminByPage",
            payload: {}
          });
        }
      });
    };

    return (
      <div style={{ maxWidth: "900px", maxHeight: "50px" }}>
        <Form layout="inline" onSubmit={handleSubmit}>
          <FormItem>
            {getFieldDecorator("filterValue")(
              <Input addonBefore={select} placeholder="请输入查询值" />
            )}
          </FormItem>
          <FormItem>
            <Button
              shape="circle"
              icon="search"
              htmlType="submit"
              loading={
                loading.effects["admin/queryAdminByFuzzyAndPage"] ||
                loading.effects["admin/queryAdminByPage"]
              }
            />
          </FormItem>
          <FormItem>
            <Button
              shape="circle"
              icon="reload"
              htmlType="reset"
              onClick={resetFields}
              loading={loading.effects["admin/queryAdminByPage"]}
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(Filter));
