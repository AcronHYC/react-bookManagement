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
import appUtils from "../../../utils/app-utils";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

class List extends Component {
  render() {
    const {
      dispatch,
      dataSource,
      selectBook,
      pagination,
      history,
      loading,
      bookClassList,
      filterPrams,
      stateKey,
      isLoading
    } = this.props;

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
          return class_name === "" ? "尚未分类" : class_name;
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
        width: 200,
        align: "center",
        render: (text, record, index) => {
          return (
            <Tooltip
              placement="top"
              title="查看该书的借阅记录"
              arrowPointAtCenter
            >
              <Button
                icon="search"
                type="primary"
                shape="circle"
                onClick={() => {
                  let path = {
                    pathname: "/home/reader/queryBorrow",
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
      </div>
    );
  }
}

export default withRouter(List);
