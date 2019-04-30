import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Tabs } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import { isAuthenticated } from "../../../utils/session";
import List from "./list";
import Filter from "./filter";

const TabPane = Tabs.TabPane;

class QueryBorrow extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  state = {
    filterPrams: {},
    stateKey: "未还"
  };

  componentDidMount() {
    try {
      this.setState({
        filterPrams: this.props.location.state.record,
        stateKey: "未还"
      });
      setTimeout(() => {
        this.props.dispatch({
          type: "book/queryBorrowByFuzzyAndPageAndUserid",
          payload: {
            status: "未还",
            bookName: this.props.location.state.record.bookName,
            user_uuid: JSON.parse(isAuthenticated("loginUser")).id
          }
        });
      }, 200);
    } catch (error) {
      this.dispatch({
        type: "book/queryBorrowByFuzzyAndPageAndUserid",
        payload: {
          status: "未还",
          user_uuid: JSON.parse(isAuthenticated("loginUser")).id
        }
      });
    }
  }

  render() {
    const { dispatch, book, loading, history } = this.props;
    const { pagination, borrowList } = book;

    const listProps = {
      dispatch,
      history,
      pagination,
      loading,
      borrowList,
      filterPrams: this.state.filterPrams,
      stateKey: this.state.stateKey
    };

    const filterProps = {
      loading,
      dispatch,
      history,
      borrowList,
      filterPrams: this.state.filterPrams,
      stateKey: this.state.stateKey,
      onSearch: newParams => {
        this.setState({
          filterPrams: newParams
        });
      }
    };

    const callback = key => {
      this.setState({
        stateKey: key
      });
      if (this.state.filterPrams.bookName !== undefined) {
        dispatch({
          type: "book/queryBorrowByFuzzyAndPageAndUserid",
          payload: {
            status: key,
            bookName: this.props.location.state.record.bookName,
            user_uuid: JSON.parse(isAuthenticated("loginUser")).id
          }
        });
      } else {
        dispatch({
          type: "book/queryBorrowByFuzzyAndPageAndUserid",
          payload: {
            status: key,
            user_uuid: JSON.parse(isAuthenticated("loginUser")).id
          }
        });
      }
    };

    return (
      <div>
        <CustomBreadcrumb arr={["借阅记录"]} />
        <Filter {...filterProps} />
        <br />
        <Tabs defaultActiveKey={this.state.stateKey} onChange={callback}>
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
