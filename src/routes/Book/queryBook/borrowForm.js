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
  Modal,
  DatePicker
} from "antd";
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class BorrowForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      selectBook,
      history,
      loading,
      userList,
      dispatch,
      onChange
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

    const timeChange = time => {
      onChange(time);
    };

    return (
      <Form {...formItemLayout}>
        <FormItem label="图书名称">
          {getFieldDecorator("book_uuid", {
            initialValue: selectBook.bookName,
            rules: [{ required: true, message: "图书名称不能为空!" }]
          })(
            <Input
              placeholder="请输入图书名称"
              style={{ width: "200px" }}
              disabled={true}
            />
          )}
        </FormItem>
        <FormItem label="借书人">
          {getFieldDecorator("user_uuid", {
            rules: [{ required: true, message: "借书人不能为空!" }]
          })(
            <Select
              style={{ width: "200px" }}
              showSearch
              placeholder="请选择借书人"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {userList
                ? userList.map(item => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.realName}
                      </Option>
                    );
                  })
                : null}
            </Select>
          )}
        </FormItem>
        <FormItem label="借书日期">
          {getFieldDecorator("borrow_date", {
            rules: [{ required: true, message: "借书日期不能为空!" }]
          })(
            <DatePicker
              style={{ width: "200px" }}
              format="YYYY-MM-DD"
              onChange={timeChange}
            />
          )}
        </FormItem>
        <FormItem label="借阅天数">
          {getFieldDecorator("borrow_day", {
            rules: [
              { required: true, message: "借阅天数不能为空!" },
              {
                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                message: "请输入大于0的数字！"
              }
            ]
          })(<Input placeholder="请输入借阅天数" style={{ width: "200px" }} />)}
        </FormItem>
      </Form>
    );
  }
}

const AddBorrowForm = Form.create()(BorrowForm);
export default AddBorrowForm;
