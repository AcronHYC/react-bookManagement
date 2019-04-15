import React, { Component } from "react";
import { connect } from "dva";
import { Spin, Button } from "antd";
import LoginForm from "./LoginForm";
import { isAuthenticated } from "../../utils/session";
import styles from "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
    this.history = this.props.history;
  }

  render() {
    const { history, dispatch, loading } = this.props;

    const loginProps = {
      dispatch,
      history,
      loading
    };

    return (
      <div className={styles.loginForm}>
        <LoginForm {...loginProps} />
      </div>
    );
  }
}

export default connect(({ login, loading }) => ({ login, loading }))(Login);
