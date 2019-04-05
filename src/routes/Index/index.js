import React from "react";
import { Layout } from "antd";
import SiderNav from "../../components/SiderNav";
import ContentMain from "../../components/ContentMain";
import HeaderBar from "../../components/HeaderBar";
import {
  isAuthenticated,
  authenticateSuccess,
  logout
} from "../../utils/cookie";

const { Sider, Header, Content, Footer } = Layout;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div id="page">
        <Layout>
          <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
            <SiderNav />
          </Sider>
          <Layout>
            <Header style={{ background: "#EDEDED", padding: "0 16px" }}>
              <HeaderBar
                collapsed={this.state.collapsed}
                onToggle={this.toggle}
              />
            </Header>
            <Content style={{ background: "#FFF" }}>
              <ContentMain />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Index;
