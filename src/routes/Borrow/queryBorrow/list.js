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

class List extends React.Component {
  render() {
    const {
      dispatch,
      dataSource,
      selectBook,
      pagination,
      history,
      loading,
      isLoading,
      filterPrams,
      stateKey,
      userList,
      borrowList
    } = this.props;

    const columns = [
      {
        title: "图书名称",
        dataIndex: "bookName",
        align: "center",
        render: (text, record, index) => {
          return record.book.bookName ? record.book.bookName : null;
        }
      },
      {
        title: "读者姓名",
        dataIndex: "realName",
        align: "center",
        render: (text, record, index) => {
          return record.user.realName ? record.user.realName : null;
        }
      },
      {
        title: "状态",
        dataIndex: "status",
        align: "center"
      },
      {
        title: "借书日期",
        dataIndex: "borrow_date",
        align: "center",
        render: (text, record, index) => {
          return appUtils.timestampToTime(record.borrow_date);
        }
      },
      {
        title: "还书日期",
        dataIndex: "back_date",
        align: "center",
        render: (text, record, index) => {
          return record.back_date
            ? appUtils.timestampToTime(record.back_date)
            : "尚未归还";
        }
      },
      {
        title: "应借天数",
        dataIndex: "borrow_day",
        align: "center"
      },
      {
        title: "逾期天数",
        dataIndex: "overdue",
        align: "center",
        render: (text, record, index) => {
          return record.overdue ? record.overdue : 0;
        }
      },
      {
        title: "操作",
        dataIndex: "operation",
        align: "center"
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
          filterPrams["status"] = stateKey;
          filterPrams["page"] = page;
          filterPrams["pageSize"] = pageSize;
          dispatch({
            type: "book/queryBorrowByFuzzyAndPage",
            payload: filterPrams
          });
        } else {
          dispatch({
            type: "book/queryBorrowByFuzzyAndPage",
            payload: {
              status: stateKey,
              page: page,
              pageSize: pageSize
            }
          });
        }
      },
      onShowSizeChange: (current, size) => {
        console.log("当前页码：" + current + "，每页数据数量：" + size);
        if (!appUtils.isEmpty(filterPrams)) {
          filterPrams["status"] = stateKey;
          filterPrams["page"] = current;
          filterPrams["pageSize"] = size;
          dispatch({
            type: "book/queryBorrowByFuzzyAndPage",
            payload: filterPrams
          });
        } else {
          dispatch({
            type: "book/queryBorrowByFuzzyAndPage",
            payload: {
              status: stateKey,
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
          dataSource={borrowList}
          rowKey={record => record.uuid}
          loading={isLoading}
          pagination={page}
        />
      </div>
    );
  }
}

export default withRouter(List);
