import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import {
  logout,
  isAuthenticated,
  setSessionStorage
} from "../../utils/session";
class CustomMenu extends React.Component {
  state = {
    openKeys: [],
    selectedKeys: []
  };

  componentDidMount() {
    const pathname = this.props.location.pathname;

    const rank = pathname.split("/");
    switch (rank.length) {
      case 2:
        this.setState({
          selectedKeys: [pathname]
        });
        break;
      case 5:
        this.setState({
          selectedKeys: [pathname],
          openKeys: [rank.slice(0, 3).join("/"), rank.slice(0, 4).join("/")]
        });
        break;
      default:
        this.setState({
          selectedKeys: [pathname],
          openKeys: [pathname.substr(0, pathname.lastIndexOf("/"))]
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const pathname = nextProps.location.pathname;
    if (this.props.location.pathname !== pathname) {
      this.setState({
        selectedKeys: [pathname]
      });
    }
  }

  onOpenChange = openKeys => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      });
      return;
    }
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      });
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      });
    }
  };

  renderMenuItem = ({ key, icon, title }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  };
  renderSubMenu = ({ key, icon, title, subs }) => {
    let role = JSON.parse(isAuthenticated("loginUser")).role;
    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {icon && <Icon type={icon} />}
            <span>{title}</span>
          </span>
        }
      >
        {subs &&
          subs.map(item => {
            if (item.role.indexOf(role) >= 0) {
              return item.subs && item.subs.length > 0
                ? this.renderSubMenu(item)
                : this.renderMenuItem(item);
            }
          })}
      </Menu.SubMenu>
    );
  };

  render() {
    const { openKeys, selectedKeys } = this.state;
    return (
      <Menu
        onOpenChange={this.onOpenChange}
        onClick={({ key }) => this.setState({ selectedKeys: [key] })}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        theme={this.props.theme ? this.props.theme : "dark"}
        mode="inline"
      >
        {this.props.menus &&
          this.props.menus.map(item => {
            return item.subs && item.subs.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenuItem(item);
          })}
      </Menu>
    );
  }
}

export default withRouter(CustomMenu);
