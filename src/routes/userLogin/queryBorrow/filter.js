import React, { Component } from "react";
import { Button, Form, Row, Col, Select, Input, DatePicker } from "antd";
import { withRouter } from "react-router-dom";
import styles from "./style.css";
import appUtils from "../../../utils/app-utils";
import { isAuthenticated } from "../../../utils/session";

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Filter extends Component {
  state = {
    borrowStartTime: "",
    borrowEndTime: "",
    backStartTime: "",
    backEndTime: ""
  };

  render() {
    const {
      dispatch,
      loading,
      onSearch,
      stateKey,
      borrowList,
      filterPrams
    } = this.props;
    const { getFieldDecorator } = this.props.form;
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

    const getBorrowRange = (date, dateString) => {
      this.setState({
        borrowStartTime: dateString[0],
        borrowEndTime: dateString[1]
      });
    };

    const getBackRange = (date, dateString) => {
      this.setState({
        backStartTime: dateString[0],
        backEndTime: dateString[1]
      });
    };

    const resetFields = e => {
      e.preventDefault();
      this.props.form.resetFields();
      this.setState({
        borrowStartTime: "",
        borrowEndTime: "",
        backStartTime: "",
        backEndTime: ""
      });
      onSearch("");
      dispatch({
        type: "book/queryBorrowByFuzzyAndPageAndUserid",
        payload: {
          status: stateKey,
          user_uuid: JSON.parse(isAuthenticated("loginUser")).id
        }
      });
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log("借阅记录查询过滤参数：" + values);
        appUtils.removeObjUnAttr(values);
        appUtils.removeObjUnAttr(filterPrams);
        values["borrowStartTime"] = this.state.borrowStartTime;
        values["borrowEndTime"] = this.state.borrowEndTime;
        values["backStartTime"] = this.state.backStartTime;
        values["backEndTime"] = this.state.backEndTime;
        onSearch(values);
        if (filterPrams.bookName !== undefined) {
          values["bookName"] = filterPrams.bookName;
        }
        values["status"] = stateKey;
        values["user_uuid"] = JSON.parse(isAuthenticated("loginUser")).id;
        dispatch({
          type: "book/queryBorrowByFuzzyAndPageAndUserid",
          payload: values
        });
      });
    };

    return (
      <div>
        <Form
          onSubmit={handleSubmit}
          onReset={resetFields}
          {...formItemLayout}
          className={styles.form}
          style={{
            background: "#fbfbfb",
            border: "1px solid #d9d9d9",
            borderRadius: "6px"
          }}
        >
          <Row gutter={23}>
            <Col span={5}>
              <FormItem label="图书名称">
                {getFieldDecorator("bookName", {})(
                  <Input
                    placeholder="请输入图书名称"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
            <Col span={7} offset={3}>
              <FormItem label="应借天数">
                {getFieldDecorator("borrow_day", {})(
                  <Input
                    placeholder="请输入借阅天数"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
            <Col span={7} offset={1}>
              <FormItem label="逾期天数">
                {getFieldDecorator("overdue", {})(
                  <Input
                    placeholder="请输入逾期天数"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={23}>
            <Col span={5}>
              <FormItem label="借书日期">
                {getFieldDecorator("borrow_range", {})(
                  <RangePicker
                    style={{ width: "300px" }}
                    onChange={getBorrowRange}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={8} offset={3}>
              <FormItem label="还书日期" style={{ marginLeft: "-6.5%" }}>
                {getFieldDecorator("back_range", {})(
                  <RangePicker
                    style={{ width: "300px" }}
                    onChange={getBackRange}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4} offset={1}>
              <Button
                style={{ marginTop: "4px" }}
                shape="circle"
                icon="search"
                htmlType="submit"
                loading={
                  loading.effects["book/queryBorrowByFuzzyAndPageAndUserid"]
                }
              />
              <Button
                style={{ marginLeft: 12 }}
                shape="circle"
                icon="reload"
                htmlType="reset"
                loading={
                  loading.effects["book/queryBorrowByFuzzyAndPageAndUserid"]
                }
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(Filter));
