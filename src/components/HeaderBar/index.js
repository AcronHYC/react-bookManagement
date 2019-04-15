import React from "react";
import {
  Icon,
  Badge,
  Dropdown,
  Menu,
  Modal,
  Popconfirm,
  message,
  Row,
  Col
} from "antd";
import screenfull from "screenfull";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../utils/session";
import { isAuthenticated } from "../../utils/session";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.history = this.props.history;
  }
  state = {
    icon: "arrows-alt"
  };

  componentDidMount() {
    screenfull.onchange(() => {
      this.setState({
        icon: screenfull.isFullscreen ? "shrink" : "arrows-alt"
      });
    });
  }

  componentWillUnmount() {
    screenfull.off("change");
  }

  toggle = () => {
    this.props.onToggle();
  };

  screenfullToggle = () => {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  };

  onOk = () => {
    logout();
    localStorage.clear();
    this.history.push("/login");
    message.success("登出成功!");
  };

  render() {
    const { collapsed } = this.props;
    const { icon } = this.state;

    return (
      <div id="headerbar">
        <Icon
          type={collapsed ? "menu-unfold" : "menu-fold"}
          className="trigger"
          onClick={this.toggle}
          style={{ fontSize: "23px" }}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Icon
          type={icon}
          onClick={this.screenfullToggle}
          style={{ fontSize: "23px" }}
        />
        <div style={{ float: "right" }}>
          <Icon type="user" style={{ fontSize: "22px" }} />
          &nbsp;
          <span style={{ fontSize: "18px" }}>
            {JSON.parse(isAuthenticated("loginUser")).adminName}
          </span>
          <Popconfirm
            title="确定退出登录吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={this.onOk}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon
              type="logout"
              style={{ fontSize: "22px" }}
              onClick={() => {}}
            />
          </Popconfirm>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderBar);
