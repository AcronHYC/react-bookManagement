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
      selectCallback(value);
    };

    const onInputChange = e => {
      inputCallback(e.target.value);
    };

    const select = (
      <Select onChange={onSelectChange} defaultValue="adminName">
        <Option value="adminName">用户名</Option>
        <Option value="realName">真实姓名</Option>
        <Option value="sex">性别</Option>
        <Option value="telephone">电话</Option>
        <Option value="email">邮箱</Option>
        <Option value="role">权限</Option>
      </Select>
    );

    const resetFields = e => {
      e.preventDefault();
      this.props.form.resetFields();
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log(
          "key:" + this.state.selectedKey + ",value:" + values.filterValue
        );
        if (values.filterValue !== undefined && values.filterValue.length > 0) {
          let jsonString =
            '{"' + this.state.selectedKey + '":"' + values.filterValue + '"}';
          let jsonObject = JSON.parse(jsonString);
          dispatch({
            type: "admin/queryAdminByFuzzyAndPage",
            payload: jsonObject
          });
        } else {
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
              <Input
                addonBefore={select}
                placeholder="请输入查询值"
                onChange={onInputChange}
              />
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
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(Filter));
