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
import moment from "moment";
import "moment/locale/zh-cn";
import appUtils from "../../../utils/app-utils";
moment.locale("zh-cn");

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const RadioGroup = Radio.Group;

class EditBorrowForm extends Component {
  state = {
    real_borrow_day: "",
    overdue: ""
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const { selectRecord, history, loading, dispatch } = this.props;

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

    const listenBackDate = (date, dateString) => {
      if (dateString !== "") {
        this.props.form.setFieldsValue({
          real_borrow_day: appUtils.getDay(
            appUtils.timestampToTime(selectRecord.borrow_date),
            dateString
          )
        });
        this.props.form.setFieldsValue({
          overdue: appUtils.getOverdue(
            appUtils.getDay(
              appUtils.timestampToTime(selectRecord.borrow_date),
              dateString
            ),
            selectRecord.borrow_day
          )
        });
        this.props.form.setFieldsValue({
          status: "已还"
        });
      } else {
        this.props.form.setFieldsValue({
          real_borrow_day: ""
        });
        this.props.form.setFieldsValue({
          overdue: ""
        });
        this.props.form.setFieldsValue({
          status: "未还"
        });
      }
    };

    const validateStatus = (rule, value, callback) => {
      if (
        value === "未还" &&
        (this.props.form.getFieldValue("back_date") !== "" &&
          this.props.form.getFieldValue("back_date") !== undefined &&
          this.props.form.getFieldValue("back_date") !== null)
      ) {
        callback("您设置了还书日期，请将借还状态设置为已还！");
      } else {
        callback();
      }
    };

    const disabledDate = current => {
      return (
        current <
        moment(new Date(appUtils.timestampToTime(selectRecord.borrow_date)))
      );
    };

    return (
      <Form {...formItemLayout}>
        <FormItem label="图书名称">
          {getFieldDecorator("book_uuid", {
            initialValue: selectRecord.book.bookName,
            rules: [{ required: true, message: "图书名称不能为空!" }]
          })(
            <Input
              placeholder="请输入图书名称"
              style={{ width: "200px" }}
              disabled={true}
            />
          )}
        </FormItem>
        <FormItem label="读者姓名">
          {getFieldDecorator("user_uuid", {
            initialValue: selectRecord.user.userName,
            rules: [{ required: true, message: "读者姓名不能为空!" }]
          })(
            <Input
              placeholder="请输入读者姓名"
              style={{ width: "200px" }}
              disabled={true}
            />
          )}
        </FormItem>
        <FormItem label="借还状态">
          {getFieldDecorator("status", {
            initialValue: "未还",
            rules: [
              {
                required: true,
                message: "借还状态不能为空!"
              },
              {
                validator: validateStatus
              }
            ]
          })(
            <RadioGroup>
              <Radio value="未还">未还</Radio>
              <Radio value="已还">已还</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="借书日期">
          {getFieldDecorator("borrow_date", {
            initialValue: moment(
              appUtils.timestampToTime(selectRecord.borrow_date),
              "YYYY-MM-DD"
            )
          })(<DatePicker style={{ width: "200px" }} disabled={true} />)}
        </FormItem>
        <FormItem label="还书日期">
          {getFieldDecorator("back_date", {
            rules: [{ required: true, message: "还书日期不能为空!" }],
            onChange: listenBackDate
          })(
            <DatePicker
              style={{ width: "200px" }}
              disabledDate={disabledDate}
            />
          )}
        </FormItem>
        <FormItem label="应借天数">
          {getFieldDecorator("borrow_day", {
            initialValue: selectRecord.borrow_day,
            rules: [{ required: true, message: "应借天数不能为空!" }]
          })(
            <Input
              placeholder="请输入应借天数"
              style={{ width: "200px" }}
              disabled={true}
            />
          )}
        </FormItem>
        <FormItem label="实际借阅天数">
          {getFieldDecorator("real_borrow_day", {
            rules: [{ required: true, message: "实际借阅天数不能为空!" }]
          })(
            <Input
              placeholder="请输入实际借阅天数"
              style={{ width: "200px" }}
            />
          )}
        </FormItem>
        <FormItem label="逾期天数">
          {getFieldDecorator("overdue", {
            rules: [{ required: true, message: "逾期天数不能为空!" }]
          })(<Input placeholder="请输入逾期天数" style={{ width: "200px" }} />)}
        </FormItem>
      </Form>
    );
  }
}

const EditForm = Form.create()(EditBorrowForm);
export default EditForm;
