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

class UpdateForm extends Component {
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
      bookClassList,
      selectBook,
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

    const validateISBN = (rule, value, callback) => {
      let flag = true;
      if (value) {
        dataSource.map(item => {
          if (item.isbn === value && item.isbn !== selectBook.isbn) {
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

    const validateState = (rule, value, callback) => {
      if (this.props.form.getFieldValue("outNum") > 0 && value === "下架") {
        callback("该图书尚未全部归还，无法下架!");
      } else {
        callback();
      }
    };

    const validateInum = (rule, value, callback) => {
      if (
        this.props.form.getFieldValue("state") === "下架" &&
        value &&
        value !== "0"
      ) {
        callback("下架图书需将在馆数量设置为0！");
      } else if (
        selectBook.state === "下架" &&
        this.props.form.getFieldValue("state") === "在馆" &&
        value &&
        parseInt(value) < 1
      ) {
        callback("重新上架的图书在馆数量必须大于0!");
      } else {
        callback();
      }
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values["uuid"] = selectBook.uuid;
          dispatch({
            type: "book/updateBook",
            payload: values,
            callback: res => {
              if (res) {
                message.success("编辑图书成功!");
                setTimeout(() => {
                  dispatch({
                    type: "book/queryBookByParams",
                    payload: { uuid: selectBook.uuid }
                  });
                }, 100);
                setTimeout(() => {
                  onChange();
                }, 500);
              }
            }
          });
        }
      });
    };

    const handleReset = e => {
      e.preventDefault();
      this.props.form.resetFields();
    };

    const classExist = () => {
      let class_uuid = "尚未分类";
      bookClassList.map(item => {
        if (item.class_uuid === selectBook.class_uuid) {
          class_uuid = item.class_uuid;
        }
      });
      return class_uuid;
    };

    const validateClass = (rule, value, callback) => {
      if (value === "尚未分类") {
        callback("请选择该图书的分类!");
      } else {
        callback();
      }
    };

    return (
      <div style={{ maxWidth: "50%", marginLeft: "20%" }}>
        <Form {...formItemLayout} onSubmit={handleSubmit} onReset={handleReset}>
          <FormItem label="图书名称" hasFeedback>
            {getFieldDecorator("bookName", {
              initialValue: selectBook.bookName,
              rules: [{ required: true, message: "图书名称不能为空!" }]
            })(
              <Input placeholder="请输入图书名称" style={{ width: "200px" }} />
            )}
          </FormItem>
          <FormItem label="作者名称" hasFeedback>
            {getFieldDecorator("author", {
              initialValue: selectBook.author,
              rules: [{ required: true, message: "作者名称不能为空!" }]
            })(
              <Input placeholder="请输入作者名称" style={{ width: "200px" }} />
            )}
          </FormItem>
          <FormItem label="出版社名称" hasFeedback>
            {getFieldDecorator("publish", {
              initialValue: selectBook.publish,
              rules: [{ required: true, message: "出版社名称不能为空!" }]
            })(
              <Input
                placeholder="请输入出版社名称"
                style={{ width: "200px" }}
              />
            )}
          </FormItem>
          <FormItem label="国际标准书号" hasFeedback>
            {getFieldDecorator("isbn", {
              initialValue: selectBook.isbn,
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
              initialValue: selectBook.price,
              rules: [{ required: true, message: "价格不能为空!" }]
            })(<Input placeholder="请输入价格" style={{ width: "200px" }} />)}
          </FormItem>
          <FormItem label="图书分类">
            {getFieldDecorator("class_uuid", {
              initialValue: classExist(),
              rules: [
                { required: true, message: "请选择图书分类" },
                { validator: validateClass }
              ]
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
          <FormItem label="在馆数量" hasFeedback>
            {getFieldDecorator("inNum", {
              initialValue: selectBook.inNum,
              rules: [
                { required: true, message: "在馆数量不能为空!" },
                { validator: validateInum },
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
              initialValue: selectBook.outNum,
              rules: [
                { required: true, message: "借出数量不能为空!" },
                {
                  pattern: new RegExp(/^[0-9]\d*$/, "g"),
                  message: "请输入数字！"
                }
              ]
            })(
              <Input placeholder="请输入借出数量" style={{ width: "200px" }} />
            )}
          </FormItem>
          <FormItem label="状态">
            {getFieldDecorator("state", {
              initialValue: selectBook.state,
              rules: [{ required: true }, { validator: validateState }]
            })(
              <RadioGroup style={{ width: "200px" }}>
                <Radio value="在馆">在馆</Radio>
                <Radio value="下架">下架</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="简介">
            {getFieldDecorator("introduction", {
              initialValue: selectBook.introduction
            })(<TextArea row={4} col={2} style={{ height: "100px" }} />)}
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
              loading={loading.effects["book/updateBook"]}
            >
              编辑图书
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 }
            }}
          >
            <Button type="primary" htmlType="reset" style={{ width: "200px" }}>
              重置
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 }
            }}
          >
            <Button
              type="primary"
              style={{ width: "200px" }}
              onClick={() => {
                history.goBack();
              }}
            >
              返回
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(UpdateForm));
