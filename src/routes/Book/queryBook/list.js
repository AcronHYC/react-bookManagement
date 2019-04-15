import React, { Component } from "react";
import {
  Table,
  Icon,
  Button,
  Popconfirm,
  message,
  Modal,
  Select,
  Tooltip
} from "antd";
import { withRouter } from "react-router-dom";
import {
  isAuthenticated,
  setSessionStorage,
  logout
} from "../../../utils/session";
import appUtils from "../../../utils/app-utils";
import AddBorrowForm from "./borrowForm";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

class List extends React.Component {
  state = {
    selectBook: {},
    visible: false,
    borrow_date: "",
    disabledButton: false
  };

  componentWillMount() {
    if (this.props.stateKey == "下架") {
      this.setState({
        disabledButton: true
      });
    }
  }

  render() {
    const {
      dispatch,
      dataSource,
      selectBook,
      pagination,
      history,
      loading,
      isLoading,
      bookClassList,
      filterPrams,
      stateKey,
      userList
    } = this.props;

    const formProps = {
      history,
      loading,
      userList,
      dispatch,
      selectBook: this.state.selectBook,
      onChange: newTime => {
        this.setState({
          borrow_date: moment(newTime).format("YYYY-MM-DD")
        });
      }
    };

    const onCancel = () => {
      this.setState({
        visible: false
      });
    };

    const onOk = e => {
      this.refs.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let param = {
            uuid: this.state.selectBook.uuid,
            user_uuid: values.user_uuid,
            inNum: this.state.selectBook.inNum,
            outNum: this.state.selectBook.outNum,
            borrow_date: this.state.borrow_date,
            borrow_day: values.borrow_day
          };
          dispatch({
            type: "book/addBorrow",
            payload: param,
            callback: res => {
              if (res) {
                message.success("添加成功!");
                this.refs.form.resetFields();
                this.setState({
                  visible: false
                });
              }
              dispatch({
                type: "book/queryBookByFuzzyAndPage",
                payload: {
                  state: stateKey
                }
              });
            }
          });
        }
      });
    };

    const columns = [
      {
        title: "图书名称",
        dataIndex: "bookName",
        align: "center"
      },
      {
        title: "作者",
        dataIndex: "author",
        align: "center"
      },
      {
        title: "出版社",
        dataIndex: "publish",
        align: "center"
      },
      {
        title: "国际标准书号",
        dataIndex: "isbn",
        align: "center"
      },
      {
        title: "价格",
        dataIndex: "price",
        align: "center"
      },
      {
        title: "图书类别",
        dataIndex: "class_uuid",
        align: "center",
        render: (text, record, index) => {
          let class_name = "";
          bookClassList.map(item => {
            if (item.class_uuid === record.class_uuid) {
              class_name = item.class_name;
            }
          });
          return class_name;
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        align: "center"
      },
      {
        title: "在馆数量",
        dataIndex: "inNum",
        align: "center"
      },
      {
        title: "借出数量",
        dataIndex: "outNum",
        align: "center"
      },
      {
        title: "操作",
        dataIndex: "operation",
        align: "center",
        render: (text, record, index) => {
          return (
            <span>
              <Tooltip placement="top" title="编辑书籍" arrowPointAtCenter>
                <Button
                  icon="edit"
                  type="primary"
                  shape="circle"
                  onClick={() => {
                    let path = {
                      pathname: "/home/bookManagement/updateBook",
                      state: {
                        record
                      }
                    };
                    this.props.history.push(path);
                  }}
                />
              </Tooltip>
              &nbsp;&nbsp;&nbsp;
              <Tooltip placement="top" title="添加借书记录" arrowPointAtCenter>
                <Button
                  icon="plus"
                  type="primary"
                  shape="circle"
                  onClick={() => {
                    if (record.inNum === "0") {
                      message.warn("在馆数量不足，无法借阅！");
                    } else {
                      this.setState({
                        visible: true,
                        selectBook: record
                      });
                    }
                  }}
                  disabled={this.state.disabledButton}
                />
              </Tooltip>
            </span>
          );
        }
      }
    ];

    const page = {
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: total => `共 ${total} 条`,
      current: pagination.page,
      pageSize: pagination.pageSize,
      total: pagination.total,
      onChange: (page, pageSize) => {
        console.log("切换后的页码：" + page + "，每页数据数量：" + pageSize);
        if (!appUtils.isEmpty(filterPrams)) {
          filterPrams["state"] = stateKey;
          filterPrams["page"] = page;
          filterPrams["pageSize"] = pageSize;
          dispatch({
            type: "book/queryBookByFuzzyAndPage",
            payload: filterPrams
          });
        } else {
          dispatch({
            type: "book/queryBookByFuzzyAndPage",
            payload: {
              state: stateKey,
              page: page,
              pageSize: pageSize
            }
          });
        }
      },
      onShowSizeChange: (current, size) => {
        console.log("当前页码：" + current + "，每页数据数量：" + size);
        if (!appUtils.isEmpty(filterPrams)) {
          filterPrams["state"] = stateKey;
          filterPrams["page"] = current;
          filterPrams["pageSize"] = size;
          dispatch({
            type: "book/queryBookByFuzzyAndPage",
            payload: filterPrams
          });
        } else {
          dispatch({
            type: "book/queryBookByFuzzyAndPage",
            payload: {
              state: stateKey,
              page: current,
              pageSize: size
            }
          });
        }
      }
    };

    return (
      <div
        style={{
          minWidth: "100%",
          minHeight: "600px"
        }}
      >
        <Table
          columns={columns}
          locale={{ emptyText: "暂无数据" }}
          size="small"
          bordered={true}
          dataSource={dataSource}
          rowKey={record => record.uuid}
          loading={isLoading}
          pagination={page}
        />
        <Modal
          title="添加借书记录"
          visible={this.state.visible}
          onCancel={onCancel}
          onOk={onOk}
        >
          <AddBorrowForm ref="form" {...formProps} />
        </Modal>
      </div>
    );
  }
}

export default withRouter(List);
