import React, { Component } from "react";
import { Table } from "antd";
import { withRouter } from "react-router-dom";
import styles from "./styles.css";
import objectAssign from "object-assign";

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      dispatch,
      dataSource,
      isLoading,
      pagination,
      filterValue,
      selectedKey
    } = this.props;

    const columns = [
      {
        title: "用户名",
        dataIndex: "adminName",
        width: 150
      },
      {
        title: "真实姓名",
        dataIndex: "realName",
        width: 150
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 100
      },
      {
        title: "电话",
        dataIndex: "telephone",
        width: 200,
        sorter: (a, b) => a.telephone - b.telephone
      },
      {
        title: "邮箱",
        dataIndex: "email",
        width: 200,
        sorter: (a, b) => a.email.length - b.email.length
      },
      {
        title: "权限",
        dataIndex: "role",
        width: 150,
        sorter: (a, b) => a.role - b.role
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 200
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
            type: "admin/queryAdminByPage",
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
            type: "admin/queryAdminByFuzzyAndPage",
            payload: params
          });
        } else {
          dispatch({
            type: "admin/queryAdminByPage",
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
          className={styles.tableStyle}
          dataSource={dataSource}
          rowKey={record => record.uuid}
          loading={isLoading}
          pagination={page}
        />
      </div>
    );
  }
}

export default withRouter(List);
