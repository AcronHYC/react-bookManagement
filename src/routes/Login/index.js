import React, { Component } from "react";
import { connect } from "dva";
import { Spin, Button, Tabs } from "antd";
import LoginForm from "./LoginForm";
import { isAuthenticated } from "../../utils/session";
import styles from "./style.css";

const TabPane = Tabs.TabPane;

class Login extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
    this.history = this.props.history;
  }

  state = {
    tab: "adminName"
  };

  componentDidMount() {
    if (isAuthenticated("loginUser") && localStorage.getItem("token")) {
      this.history.push("/");
    }
  }

  render() {
    const { history, dispatch, loading } = this.props;

    const loginProps = {
      dispatch,
      history,
      loading,
      tab: this.state.tab
    };

    const callback = value => {
      this.setState({
        tab: value
      });
    };

    return (
      <div className={styles.loginForm}>
        <Tabs defaultActiveKey="adminName" onChange={callback}>
          <TabPane
            key="adminName"
            tab={<span style={{ fontSize: 17 }}>管理员登录</span>}
          >
            <LoginForm {...loginProps} />
          </TabPane>
          <TabPane
            key="userName"
            tab={<span style={{ fontSize: 18 }}>读者登录</span>}
          >
            <LoginForm {...loginProps} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ login, loading }) => ({ login, loading }))(Login);
