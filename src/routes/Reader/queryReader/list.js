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

class List extends React.Component {
  render() {
    const {
      dispatch,
      dataSource,
      selectReader,
      pagination,
      history,
      loading,
      isLoading,
      filterValue,
      selectedKey
    } = this.props;

    const columns = [
      {
        title: "用户名",
        dataIndex: "userName",
        width: 200,
        align: "center"
      },
      {
        title: "真实姓名",
        dataIndex: "realName",
        width: 200,
        align: "center"
      },
      {
        title: "身份证号码",
        dataIndex: "iDcard",
        width: 250,
        align: "center"
      },
      {
        title: "手机号码",
        dataIndex: "telephone",
        width: 200,
        align: "center"
      },
      {
        title: "邮箱",
        dataIndex: "email",
        width: 200,
        align: "center"
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 200,
        align: "center",
        render: (text, record, index) => {
          return (
            <Tooltip
              placement="top"
              title="查看该读者的借书记录"
              arrowPointAtCenter
            >
              <Button
                icon="search"
                type="primary"
                shape="circle"
                onClick={() => {
                  let path = {
                    pathname: "/home/circulateManagemment/borrowHistory",
                    state: {
                      record
                    }
                  };
                  history.push(path);
                }}
              />
            </Tooltip>
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
        if (filterValue !== undefined && filterValue.length > 0) {
          let params = {
            page: page,
            pageSize: pageSize
          };
          params[selectedKey] = filterValue;
          dispatch({
            type: "admin/queryAdminByFuzzyAndPage",
            payload: params
          });
        } else {
          dispatch({
            type: "reader/queryUserByFuzzyAndPage",
            payload: {
              page: page,
              pageSize: pageSize
            }
          });
        }
      },
      onShowSizeChange: (current, size) => {
        console.log("当前页码：" + current + "，每页数据数量：" + size);
        if (filterValue !== undefined && filterValue.length > 0) {
          let params = {
            page: current,
            pageSize: size
          };
          params[selectedKey] = filterValue;
          dispatch({
            type: "reader/queryUserByFuzzyAndPage",
            payload: params
          });
        } else {
          dispatch({
            type: "reader/queryUserByFuzzyAndPage",
            payload: {
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
          rowKey={record => record.id}
          loading={isLoading}
          pagination={page}
        />
      </div>
    );
  }
}

export default withRouter(List);
