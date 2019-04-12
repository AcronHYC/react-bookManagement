import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Tabs } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import List from "./list";
import Filter from "./filter";

const TabPane = Tabs.TabPane;

class QueryBook extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "book/queryUserByParams",
      payload: {}
    });
    this.props.dispatch({
      type: "book/queryBookByFuzzyAndPage",
      payload: {
        state: "在馆"
      }
    });
    this.props.dispatch({
      type: "book/queryBookClass"
    });
  }

  state = {
    filterPrams: {},
    stateKey: "在馆"
  };

  render() {
    const { dispatch, book, loading, history } = this.props;
    const { list, pagination, selectBook, bookClassList, userList } = book;

    const filterProps = {
      loading,
      dispatch,
      bookClassList,
      history,
      stateKey: this.state.stateKey,
      onSearch: newParams => {
        this.setState({
          filterPrams: newParams
        });
      }
    };

    const listProps = {
      dispatch,
      history,
      pagination,
      dataSource: list,
      bookClassList,
      selectBook,
      loading,
      userList,
      stateKey: this.state.stateKey,
      filterPrams: this.state.filterPrams,
      isLoading: loading.effects["book/queryBookByFuzzyAndPage"]
    };

    const callback = key => {
      this.setState({
        stateKey: key
      });
      dispatch({
        type: "book/queryBookByFuzzyAndPage",
        payload: {
          state: key
        }
      });
    };

    return (
      <div>
        <CustomBreadcrumb arr={["图书管理", "图书列表"]} />
        <Filter {...filterProps} />
        <br />
        <Tabs defaultActiveKey="在馆" onChange={callback}>
          <TabPane tab="在馆图书" key="在馆">
            <List {...listProps} />
          </TabPane>
          <TabPane tab="注销图书" key="下架">
            <List {...listProps} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ book, loading }) => ({ book, loading }))(QueryBook);
