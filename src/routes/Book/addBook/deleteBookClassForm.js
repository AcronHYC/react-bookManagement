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
  Modal
} from "antd";
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

class DeleteBookClassForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      dataSource,
      dispatch,
      history,
      loading,
      bookClassList
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
    return (
      <Form {...formItemLayout}>
        <FormItem label="分类名称">
          {getFieldDecorator("class_uuid", {
            rules: [{ required: true, message: "分类名称不能为空!" }]
          })(
            <Select
              style={{ width: "200px" }}
              showSearch
              placeholder="请选择图书分类"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {bookClassList
                ? bookClassList.map(item => {
                    return (
                      <Option value={item.class_uuid} key={item.class_uuid}>
                        {item.class_name}
                      </Option>
                    );
                  })
                : null}
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

const BookClassForm2 = Form.create()(DeleteBookClassForm);

export default BookClassForm2;
