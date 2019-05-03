import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Spin } from "antd";
import UpdateForm from "./form";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";

class UpdateAdmin extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "admin/queryAdminByParams",
      payload: {
        admin: {}
      }
    });
  }

  render() {
    const { dispatch, loading, history, admin } = this.props;
    const { list } = admin;

    const formProps = {
      dispatch,
      history,
      loading,
      dataSource: list
    };

    return (
      <div>
        <Spin
          tip="加载中..."
          spinning={
            loading.effects["admin/queryAdminByParams"] &&
            loading.effects["admin/queryAdminById"]
          }
        >
          <CustomBreadcrumb arr={["管理员管理", "修改资料"]} />
          <UpdateForm {...formProps} />
        </Spin>
      </div>
    );
  }
}

export default connect(({ admin, loading }) => ({ admin, loading }))(
  UpdateAdmin
);
