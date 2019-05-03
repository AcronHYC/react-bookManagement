import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Tabs, Spin } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import UpdateForm from "./form";
import Img from "./img";

class UpdateInfo extends Component {
  componentDidMount() {
    console.log("test");
    this.props.dispatch({
      type: "reader/queryUserByParams",
      payload: {
        reader: {}
      }
    });
  }

  render() {
    const { dispatch, loading, history, reader } = this.props;
    const { list } = reader;

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
            loading.effects["reader/queryUserByParams"] &&
            loading.effects["reader/queryUserById"]
          }
        >
          <CustomBreadcrumb arr={["修改个人资料"]} />
          <UpdateForm {...formProps} />
          {/* <Img /> */}
        </Spin>
      </div>
    );
  }
}

export default connect(({ reader, loading }) => ({ reader, loading }))(
  UpdateInfo
);
