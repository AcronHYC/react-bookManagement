import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Tabs } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import List from "./list";
import Filter from "./filter";

const TabPane = Tabs.TabPane;

class QueryBorrow extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "book/queryBorrowByFuzzyAndPage",
      payload: {
        status: "未还"
      }
    });
  }

  state = {
    filterPrams: {},
    stateKey: "未还"
  };

  render() {
    const { dispatch, book, loading, history } = this.props;
    const {
      list,
      pagination,
      selectBook,
      bookClassList,
      userList,
      borrowList
    } = book;

    const listProps = {
      dispatch,
      history,
      pagination,
      loading,
      borrowList,
      pagination,
      bookClassList,
      filterPrams: this.state.filterPrams,
      dataSource: list,
      stateKey: this.state.stateKey,
      isLoading: loading.effects["book/queryBorrowByFuzzyAndPage"]
    };

    const callback = key => {
      this.setState({
        stateKey: key
      });
      dispatch({
        type: "book/queryBorrowByFuzzyAndPage",
        payload: {
          status: key
        }
      });
    };

    const filterProps = {
      loading,
      dispatch,
      bookClassList,
      history,
      borrowList,
      stateKey: this.state.stateKey,
      onSearch: newParams => {
        this.setState({
          filterPrams: newParams
        });
      }
    };

    return (
      <div>
        <CustomBreadcrumb arr={["借还管理", "借阅记录"]} />
        <Filter {...filterProps} />
        <br />
        <Tabs defaultActiveKey="未还" onChange={callback}>
          <TabPane tab="未还记录" key="未还">
            <List {...listProps} />
          </TabPane>
          <TabPane tab="已还记录" key="已还">
            <List {...listProps} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ book, loading }) => ({ book, loading }))(QueryBorrow);
