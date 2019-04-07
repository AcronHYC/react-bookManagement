import React, { Component } from "react";
import { connect } from "dva";
import { Spin, Button } from "antd";
import LoginForm from "./LoginForm";
import { isAuthenticated } from "../../utils/cookie";
import styles from "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
    this.history = this.props.history;
  }

  componentWillMount() {
    console.log(document.cookie);
    if (isAuthenticated("uuid")) {
      console.log("Your cookie uuid:" + isAuthenticated("uuid"));
      this.history.push("/");
    }
  }

  componentDidMount() {
    this.dispatch({
      type: "login/queryAdminByParams",
      payload: {
        admin: {}
      }
    });
  }

  render() {
    const { history, dispatch, login, loading } = this.props;
    const { list } = login;

    const loginProps = {
      dispatch,
      dataSource: list,
      history
    };

    return (
      <div className={styles.loginForm}>
        <Spin
          tip="加载中..."
          spinning={loading.effects["login/queryAdminByParams"]}
        >
          <LoginForm {...loginProps} />
        </Spin>
      </div>
    );
  }
}

export default connect(({ login, loading }) => ({ login, loading }))(Login);
