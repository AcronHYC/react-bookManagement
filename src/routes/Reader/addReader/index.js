import React, { Component } from "react";
import { connect } from "dva";
import { Layout } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import AddForm from "./form";

class AddReader extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "reader/queryUserByParams",
      payload: {}
    });
  }

  render() {
    const { dispatch, loading, history, reader } = this.props;
    const { list, isAddSuccess } = reader;

    const formProps = {
      dispatch,
      history,
      loading,
      isAddSuccess,
      dataSource: list
    };

    return (
      <div>
        <CustomBreadcrumb arr={["读者管理", "新增读者"]} />
        <AddForm {...formProps} />
      </div>
    );
  }
}

export default connect(({ reader, loading }) => ({ reader, loading }))(
  AddReader
);
