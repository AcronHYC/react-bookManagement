import React, { Component } from "react";
import { Button, Form, Row, Col, Select, Input, DatePicker } from "antd";
import { withRouter } from "react-router-dom";
import styles from "./style.css";
import appUtils from "../../../utils/app-utils";

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
    const { dispatch, loading, onSearch, stateKey, borrowList } = this.props;
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
      dispatch({
        type: "book/queryBorrowByFuzzyAndPage",
        payload: {
          status: stateKey
        }
      });
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.dir("借阅记录查询过滤参数：" + values.borrow_range);
        appUtils.removeObjUnAttr(values);
        values["borrowStartTime"] = this.state.borrowStartTime;
        values["borrowEndTime"] = this.state.borrowEndTime;
        values["backStartTime"] = this.state.backStartTime;
        values["backEndTime"] = this.state.backEndTime;
        onSearch(values);
        values["status"] = stateKey;
        dispatch({
          type: "book/queryBorrowByFuzzyAndPage",
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
            <Col span={6}>
              <FormItem label="读者姓名">
                {getFieldDecorator("realName", {})(
                  <Input
                    placeholder="请输入读者姓名"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
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
            <Col span={6}>
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
              <FormItem label="还书日期">
                {getFieldDecorator("back_range", {})(
                  <RangePicker
                    style={{ width: "300px" }}
                    onChange={getBackRange}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4} offset={2}>
              <Button
                style={{ marginTop: "4px" }}
                shape="circle"
                icon="search"
                htmlType="submit"
                loading={loading.effects["book/queryBorrowByFuzzyAndPage"]}
              />
              <Button
                style={{ marginLeft: 12 }}
                shape="circle"
                icon="reload"
                htmlType="reset"
                loading={loading.effects["book/queryBorrowByFuzzyAndPage"]}
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(Filter));
