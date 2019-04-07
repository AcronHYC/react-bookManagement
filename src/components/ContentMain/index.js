import React, { Component } from "react";
import { withRouter, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import LoadableComponent from "../../utils/LoadableComponent";

const QueryAdmin = LoadableComponent(() =>
  import("../../routes/Admin/queryAdmin/index")
);

class ContentMain extends Component {
  render() {
    return (
      <div style={{ padding: 16, position: "relative" }}>
        <Switch>
          <PrivateRoute
            exact
            path="/home/adminManagemment/queryAdmin"
            component={QueryAdmin}
          />
          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default ContentMain;
