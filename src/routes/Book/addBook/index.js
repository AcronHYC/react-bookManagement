import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Modal, message } from "antd";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import AddForm from "./form";
import BookClassForm from "./addBookClassForm";
import BookClassForm2 from "./deleteBookClassForm";

class AddBook extends Component {
  state = {
    visible: false,
    visible2: false
  };

  componentDidMount() {
    this.props.dispatch({
      type: "book/queryBookByParams",
      payload: {}
    });
    this.props.dispatch({
      type: "book/queryBookClass"
    });
  }

  render() {
    const { dispatch, loading, history, book } = this.props;
    const {
      list,
      isAddBookSuccess,
      isAddBookClassSuccess,
      bookClassList
    } = book;

    const onCancel = () => {
      this.setState({
        visible: false,
        visible2: false
      });
    };

    const onOk = e => {
      this.refs.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          dispatch({
            type: "book/addBookClass",
            payload: values
          });
          message.success("添加图书分类成功!");
          setTimeout(() => {
            dispatch({
              type: "book/queryBookClass"
            });
          }, 500);
          this.setState({
            visible: false
          });
          this.refs.form.resetFields();
        }
      });
    };

    const onOk2 = e => {
      this.refs.form2.validateFieldsAndScroll((err, values) => {
        if (!err) {
          dispatch({
            type: "book/deleteBookClass",
            payload: values
          });
          message.success("删除图书分类成功!");
          setTimeout(() => {
            dispatch({
              type: "book/queryBookClass"
            });
          }, 500);
          this.setState({
            visible2: false
          });
          this.refs.form2.resetFields();
        }
      });
    };

    const formProps = {
      dispatch,
      history,
      loading,
      isAddBookSuccess,
      dataSource: list,
      bookClassList,
      toggleModal: newState => {
        this.setState({
          visible: newState
        });
      },
      toggleModal2: newState => {
        this.setState({
          visible2: newState
        });
      }
    };

    const bookClassProps = {
      dispatch,
      history,
      loading,
      isAddBookClassSuccess,
      dataSource: list,
      bookClassList
    };

    const bookClassProps2 = {
      dispatch,
      history,
      loading,
      dataSource: list,
      bookClassList
    };

    return (
      <div>
        <CustomBreadcrumb arr={["图书管理", "新增图书"]} />
        <AddForm {...formProps} />
        <Modal
          title="新增图书分类"
          visible={this.state.visible}
          onCancel={onCancel}
          onOk={onOk}
        >
          <BookClassForm ref="form" {...bookClassProps} />
        </Modal>
        <Modal
          title="删除图书分类"
          visible={this.state.visible2}
          onCancel={onCancel}
          onOk={onOk2}
        >
          <BookClassForm2 ref="form2" {...bookClassProps2} />
        </Modal>
      </div>
    );
  }
}

export default connect(({ book, loading }) => ({ book, loading }))(AddBook);
