import React, { Component } from "react";
import { Button, Form, Row, Col, Select, Input } from "antd";
import { withRouter } from "react-router-dom";
import styles from "./style.css";
import appUtils from "../../../utils/app-utils";

const FormItem = Form.Item;
const Option = Select.Option;

class Filter extends Component {
  render() {
    const { dispatch, loading, bookClassList, onSearch, stateKey } = this.props;
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

    const resetFields = e => {
      e.preventDefault();
      this.props.form.resetFields();
      onSearch("");
      dispatch({
        type: "book/queryBookByFuzzyAndPage",
        payload: {
          state: stateKey
        }
      });
    };

    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log("图书查询过滤参数：" + values);
        appUtils.removeObjUnAttr(values);
        onSearch(values);
        values["state"] = stateKey;
        dispatch({
          type: "book/queryBookByFuzzyAndPage",
          payload: values
        });
      });
    };

    return (
      <div>
        <Form
          {...formItemLayout}
          className={styles.form}
          style={{
            background: "#fbfbfb",
            border: "1px solid #d9d9d9",
            borderRadius: "6px"
          }}
          onSubmit={handleSubmit}
          onReset={resetFields}
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
              <FormItem label="作者名称">
                {getFieldDecorator("author", {})(
                  <Input
                    placeholder="请输入作者名称"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="出版社名称">
                {getFieldDecorator("publish", {})(
                  <Input
                    placeholder="请输入出版社名称"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="国际标准书号">
                {getFieldDecorator("isbn", {})(
                  <Input
                    placeholder="请输入国际标准书号"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={23}>
            <Col span={5}>
              <FormItem label="图书类型">
                {getFieldDecorator("class_uuid", {})(
                  <Select
                    allowClear
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
                            <Option
                              value={item.class_uuid}
                              key={item.class_uuid}
                            >
                              {item.class_name}
                            </Option>
                          );
                        })
                      : null}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="价格">
                {getFieldDecorator("price", {})(
                  <Input
                    placeholder="请输入价格"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="在馆数量">
                {getFieldDecorator("inNum", {})(
                  <Input
                    placeholder="请输入在馆数量"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="借出数量">
                {getFieldDecorator("outNum", {})(
                  <Input
                    placeholder="请输入借出数量"
                    style={{ width: "200px" }}
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={23} style={{ textAlign: "left" }}>
              <Button
                style={{ marginLeft: 16 }}
                shape="circle"
                icon="search"
                htmlType="submit"
                loading={loading.effects["book/queryBookByFuzzyAndPage"]}
              />
              <Button
                style={{ marginLeft: 12 }}
                shape="circle"
                icon="reload"
                htmlType="reset"
                loading={loading.effects["book/queryBookByFuzzyAndPage"]}
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default withRouter(Form.create()(Filter));
