import React, { Component } from "react";
import { connect } from "dva";
import { Layout, message } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import AddForm from "./form";
import {
  isAuthenticated,
  setSessionStorage,
  logout
} from "../../../utils/session";

class AddAdmin extends Component {
  componentWillMount() {
    const role = JSON.parse(isAuthenticated("loginUser")).role;
    if (role !== "1") {
      message.warn("对不起，您的权限无法访问该页面!");
      this.props.history.push("/home");
    }
  }

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
    const { list, isAddSuccess } = admin;

    const formProps = {
      dispatch,
      history,
      loading,
      isAddSuccess,
      dataSource: list
    };

    return (
      <div>
        <CustomBreadcrumb arr={["管理员管理", "新增管理员"]} />
        <AddForm {...formProps} />
        />
      </div>
    );
  }
}

export default connect(({ admin, loading }) => ({ admin, loading }))(AddAdmin);
