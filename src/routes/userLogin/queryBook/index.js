import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Tabs } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import List from "./list";
import Filter from "../../Book/queryBook/filter";

const TabPane = Tabs.TabPane;

class QueryBook extends Component {
  state = {
    filterPrams: {},
    stateKey: "在馆"
  };

  componentDidMount() {
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

  render() {
    const { dispatch, book, loading, history } = this.props;
    const { list, pagination, selectBook, bookClassList } = book;

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
      stateKey: this.state.stateKey,
      filterPrams: this.state.filterPrams,
      isLoading: loading.effects["book/queryBookByFuzzyAndPage"]
    };

    return (
      <div>
        <CustomBreadcrumb arr={["查询图书"]} />
        <Filter {...filterProps} />
        <br />
        <Tabs defaultActiveKey="在馆">
          <TabPane tab="在馆图书" key="在馆">
            <List {...listProps} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ book, loading }) => ({ book, loading }))(QueryBook);
