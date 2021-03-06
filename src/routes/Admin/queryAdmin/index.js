import React, { Component } from "react";
import { connect } from "dva";
import { Layout } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import List from "./list";
import Filter from "./filter";

class QueryAdmin extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    filterValue: "",
    selectedKey: "adminName"
  };

  componentDidMount() {
    this.props.dispatch({
      type: "admin/queryAdminByPage",
      payload: {}
    });
  }

  render() {
    const { dispatch, admin, loading, history } = this.props;
    const { list, pagination, selectAdmin } = admin;

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
      filterValue: this.state.filterValue,
      selectedKey: this.state.selectedKey,
      dataSource: list,
      selectAdmin,
      loading,
      isLoading: loading.effects["admin/queryAdminByPage"]
    };

    return (
      <div>
        <CustomBreadcrumb arr={["管理员管理", "管理员列表"]} />
        <Filter {...filterProps} />
        <List {...listProps} />
      </div>
    );
  }
}

export default connect(({ admin, loading }) => ({ admin, loading }))(
  QueryAdmin
);
