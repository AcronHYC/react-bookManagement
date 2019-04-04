import React from "react";
import { Icon, Badge, Dropdown, Menu, Modal } from "antd";
import screenfull from "screenfull";
import { Link, withRouter } from "react-router-dom";

class HeaderBar extends React.Component {
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

  render() {
    const { collapsed } = this.props;
    const { icon } = this.state;

    return (
      <div id="headerbar">
        <Icon
          type={collapsed ? "menu-unfold" : "menu-fold"}
          className="trigger"
          onClick={this.toggle}
          style={{ fontSize: "22px" }}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Icon
          type={icon}
          onClick={this.screenfullToggle}
          style={{ fontSize: "22px" }}
        />
      </div>
    );
  }
}

export default withRouter(HeaderBar);
