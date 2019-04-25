import React, { Component } from "react";
import { Table, Icon, Button, Popconfirm, message, Modal, Select } from "antd";
import { withRouter } from "react-router-dom";
import styles from "./styles.css";
import objectAssign from "object-assign";
import {
  isAuthenticated,
  setSessionStorage,
  logout
} from "../../../utils/session";

const Option = Select.Option;

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    disabledButton: true,
    modalShow: false,
    selectedKey: "3",
    selectedUuid: ""
  };

  componentWillMount() {
    const role = JSON.parse(isAuthenticated("loginUser")).role;
    if (role === "1") {
      this.setState({
        disabledButton: false
      });
    }
  }

  render() {
    const {
      dispatch,
      dataSource,
      selectAdmin,
      isLoading,
      pagination,
      filterValue,
      selectedKey,
      history,
      loading
    } = this.props;

    const toggleModal = () => {
      this.setState({
        modalShow: !this.state.modalShow
      });
    };

    const onSelectChange = value => {
      this.setState({
        selectedKey: value
      });
    };

    const onOk = () => {
      if (this.state.selectedKey === selectAdmin.role) {
        toggleModal();
      } else {
        dispatch({
          type: "admin/updateAdmin",
          payload: {
            role: this.state.selectedKey,
            uuid: this.state.selectedUuid
          },
          callback: res => {
            if (res) {
              setTimeout(() => {
                dispatch({
                  type: "admin/queryAdminByPage",
                  payload: {}
                });
              }, 500);
              message.success("更新权限成功！");
              toggleModal();
            }
          }
        });
      }
    };

    const columns = [
      {
        title: "用户名",
        dataIndex: "adminName",
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
        title: "性别",
        dataIndex: "sex",
        width: 100,
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
        title: "权限",
        dataIndex: "roleName",
        width: 150,
        align: "center"
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 200,
        align: "center",
        render: (text, record, index) => {
          return (
            <span>
              <Button
                icon="edit"
                type="primary"
                shape="circle"
                disabled={this.state.disabledButton}
                onClick={() => {
                  this.setState({
                    selectedUuid: record.uuid
                  });
                  dispatch({
                    type: "admin/queryAdminByParams",
                    payload: {
                      uuid: record.uuid
                    }
                  });
                  toggleModal();
                }}
              />
              &nbsp;&nbsp;&nbsp;
              <Popconfirm
                title="确定删除该行数据吗"
                onConfirm={() => {
                  let loginUuid = JSON.parse(isAuthenticated("loginUser")).uuid;
                  if (loginUuid === record.uuid) {
                    dispatch({
                      type: "admin/deleteAdmin",
                      payload: {
                        uuid: record.uuid
                      },
                      callback: res => {
                        if (res) {
                          message.success("您删除了自己的数据，现退出登录！");
                          logout();
                          history.push("/login");
                        }
                      }
                    });
                  } else {
                    dispatch({
                      type: "admin/deleteAdmin",
                      payload: {
                        uuid: record.uuid
                      },
                      callback: res => {
                        if (res) {
                          setTimeout(() => {
                            dispatch({
                              type: "admin/queryAdminByPage",
                              payload: {}
                            });
                          }, 500);
                          message.success("删除成功!");
                        }
                      }
                    });
                  }
                }}
              >
                <Button
                  icon="delete"
                  type="primary"
                  shape="circle"
                  disabled={this.state.disabledButton}
                />
              </Popconfirm>
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
        <Modal
          title="编辑"
          visible={this.state.modalShow}
          onCancel={toggleModal}
          onOk={onOk}
        >
          &nbsp;&nbsp;&nbsp;&nbsp; 只能修改该管理员的权限：
          <Select onChange={onSelectChange} defaultValue="3">
            <Option value="1">超级管理员</Option>
            <Option value="2">高级管理员</Option>
            <Option value="3">普通管理员</Option>
          </Select>
        </Modal>
      </div>
    );
  }
}

export default withRouter(List);
