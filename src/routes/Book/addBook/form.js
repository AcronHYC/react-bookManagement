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

class AddForm extends Component {
  state = {
    confirmDirty: false,
    addFlag: false
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      dataSource,
      dispatch,
      history,
      loading,
      isAddSuccess,
      bookClassList,
      toggleModal,
      toggleModal2
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

    const setVisible = () => {
      toggleModal(true);
    };

    const setVisible2 = () => {
      toggleModal2(true);
    };

    const validateISBN = (rule, value, callback) => {
      let flag = true;
      if (value) {
        dataSource.map(item => {
          if (item.isbn === value) {
            callback("该国际标准书号已经被使用!");
          }
        });
        if (flag) {
          callback();
        }
      } else {
        callback();
      }
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          dispatch({
            type: "book/addBook",
            payload: values,
            callback: res => {
              if (res) {
                message.success("新增图书成功!");
                setTimeout(() => {
                  dispatch({
                    type: "book/queryBookByParams",
                    payload: {}
                  });
                }, 500);
                this.props.form.resetFields();
              }
            }
          });
        }
      });
    };

    return (
      <div style={{ maxWidth: "50%", marginLeft: "20%" }}>
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <FormItem label="图书名称" hasFeedback>
            {getFieldDecorator("bookName", {
              rules: [{ required: true, message: "图书名称不能为空!" }]
            })(
              <Input placeholder="请输入图书名称" style={{ width: "200px" }} />
            )}
          </FormItem>
          <FormItem label="作者名称" hasFeedback>
            {getFieldDecorator("author", {
              rules: [{ required: true, message: "作者名称不能为空!" }]
            })(
              <Input placeholder="请输入作者名称" style={{ width: "200px" }} />
            )}
          </FormItem>
          <FormItem label="出版社名称" hasFeedback>
            {getFieldDecorator("publish", {
              rules: [{ required: true, message: "出版社名称不能为空!" }]
            })(
              <Input
                placeholder="请输入出版社名称"
                style={{ width: "200px" }}
              />
            )}
          </FormItem>
          <FormItem label="国际标准书号" hasFeedback>
            {getFieldDecorator("ISBN", {
              rules: [
                {
                  required: true,
                  message: "国际标准书号不能为空!"
                },
                { validator: validateISBN }
              ]
            })(
              <Input
                placeholder="请输入国际标准书号"
                style={{ width: "200px" }}
              />
            )}
          </FormItem>
          <FormItem label="价格" hasFeedback>
            {getFieldDecorator("price", {
              rules: [{ required: true, message: "价格不能为空!" }]
            })(<Input placeholder="请输入价格" style={{ width: "200px" }} />)}
          </FormItem>
          <FormItem label="图书分类">
            {getFieldDecorator("class_uuid", {
              rules: [{ required: true, message: "请选择图书分类" }]
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
          <Button
            icon="plus-circle"
            style={{
              position: "absolute",
              marginLeft: "32%",
              marginTop: "-4.5%"
            }}
            onClick={setVisible}
          />

          <Button
            icon="minus-circle"
            style={{
              position: "absolute",
              marginLeft: "35%",
              marginTop: "-4.5%"
            }}
            onClick={setVisible2}
          />
          <FormItem label="在馆数量" hasFeedback>
            {getFieldDecorator("inNum", {
              rules: [
                { required: true, message: "在馆数量不能为空!" },
                {
                  pattern: new RegExp(/^[0-9]\d*$/, "g"),
                  message: "请输入数字！"
                }
              ]
            })(
              <Input placeholder="请输入在馆数量" style={{ width: "200px" }} />
            )}
          </FormItem>
          <FormItem label="借出数量" hasFeedback>
            {getFieldDecorator("outNum", {
              initialValue: "0",
              rules: [{ required: true, message: "借出数量不能为空!" }]
            })(
              <Input
                placeholder="请输入借出数量"
                style={{ width: "200px" }}
                disabled={true}
              />
            )}
          </FormItem>
          <FormItem label="状态">
            {getFieldDecorator("state", {
              initialValue: "在馆",
              rules: [{ required: true }]
            })(
              <RadioGroup style={{ width: "200px" }} disabled={true}>
                <Radio value="在馆">在馆</Radio>
                <Radio value="下架">下架</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="简介">
            {getFieldDecorator("introduction", {})(
              <TextArea row={4} col={2} style={{ height: "100px" }} />
            )}
          </FormItem>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 }
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "200px" }}
              loading={loading.effects["book/addBook"]}
            >
              新增图书
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(AddForm));
