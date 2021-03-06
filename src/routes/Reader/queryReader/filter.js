import React, { Component } from "react";
import { Button, Form, Row, Col, Select, Input } from "antd";
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;
const Option = Select.Option;

class Filter extends Component {
  state = {
    selectedKey: "userName",
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
            type: "reader/queryUserByFuzzyAndPage",
            payload: jsonObject
          });
        } else {
          inputCallback("");
          dispatch({
            type: "reader/queryUserByFuzzyAndPage",
            payload: {}
          });
        }
      });
    };

    const select = (
      <Select onChange={onSelectChange} defaultValue="userName">
        <Option value="userName">用户名</Option>
        <Option value="realName">真实姓名</Option>
        <Option value="idcard">身份证号码</Option>
        <Option value="telephone">手机号码 </Option>
        <Option value="email">邮箱</Option>
      </Select>
    );

    const resetFields = e => {
      e.preventDefault();
      this.props.form.resetFields();
      inputCallback("");
      dispatch({
        type: "reader/queryUserByFuzzyAndPage",
        payload: {}
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
              loading={loading.effects["reader/queryUserByFuzzyAndPage"]}
            />
          </FormItem>
          <FormItem>
            <Button
              shape="circle"
              icon="reload"
              htmlType="reset"
              onClick={resetFields}
              loading={loading.effects["reader/queryUserByFuzzyAndPage"]}
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(Filter));
