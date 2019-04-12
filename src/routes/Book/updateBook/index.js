import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Modal, message } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import UpdateForm from "./form";
import appUtils from "../../../utils/app-utils";

class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.selectBook = this.props.location.state.record;
  }

  state = {
    key: "1"
  };

  componentDidMount() {
    this.props.dispatch({
      type: "book/queryBookByParams"
    });
    this.props.dispatch({
      type: "book/queryBookClass"
    });
  }

  render() {
    const { dispatch, book, loading, history } = this.props;
    const { list, bookClassList, selectBook } = book;
    const formProps = {
      dispatch,
      history,
      loading,
      dataSource: list,
      bookClassList,
      onChange: () => {
        this.setState({
          key: "2"
        });
      },
      selectBook:
        selectBook.uuid === undefined || this.state.key === "1"
          ? this.selectBook
          : selectBook
    };

    return (
      <div>
        <CustomBreadcrumb arr={["图书管理", "编辑图书"]} />
        <UpdateForm {...formProps} />
      </div>
    );
  }
}

export default connect(({ book, loading }) => ({ book, loading }))(UpdateBook);
