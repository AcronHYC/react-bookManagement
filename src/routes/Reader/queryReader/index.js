import React, { Component } from "react";
import { connect } from "dva";
import { Layout } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import List from "./list";
import Filter from "./filter";

class QueryReader extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "reader/queryUserByFuzzyAndPage",
      payload: {}
    });
  }

  state = {
    filterValue: "",
    selectedKey: "userName"
  };

  render() {
    const { dispatch, reader, loading, history } = this.props;
    const { list, pagination, selectReader } = reader;

    const filterProps = {
      loading,
      dispatch,
      inputCallback: childFilterValue => {
        this.setState({
          filterValue: childFilterValue
        });
      },
      selectCallback: childSelectedKey => {
        this.setState({
          selectedKey: childSelectedKey
        });
      }
    };

    const listProps = {
      dispatch,
      history,
      pagination,
      dataSource: list,
      selectReader,
      filterValue: this.state.filterValue,
      selectedKey: this.state.selectedKey,
      loading,
      isLoading: loading.effects["reader/queryUserByFuzzyAndPage"]
    };

    return (
      <div>
        <CustomBreadcrumb arr={["读者管理", "查看读者信息"]} />
        <Filter {...filterProps} />
        <List {...listProps} />
      </div>
    );
  }
}

export default connect(({ reader, loading }) => ({ reader, loading }))(
  QueryReader
);
