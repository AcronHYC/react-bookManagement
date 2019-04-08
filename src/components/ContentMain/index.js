import React, { Component } from "react";
import { withRouter, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import LoadableComponent from "../../utils/LoadableComponent";
import dynamic from "dva/dynamic";
import app from "../../index";

const QueryAdmin = LoadableComponent(() =>
  import("../../routes/Admin/queryAdmin")
);
const AddAdmin = LoadableComponent(() => import("../../routes/Admin/addAdmin"));
const UpdateAdmin = LoadableComponent(() =>
  import("../../routes/Admin/updateAdmin")
);

class ContentMain extends Component {
  render() {
    // const QueryAdmin = dynamic({
    //   app,
    //   models: () => [import("../../models/admin")],
    //   component: () => import("../../routes/Admin/queryAdmin")
    // });

    return (
      <div style={{ padding: 16, position: "relative" }}>
        <Switch>
          <PrivateRoute
            exact
            path="/home/adminManagemment/queryAdmin"
            component={QueryAdmin}
          />
          <PrivateRoute
            exact
            path="/home/adminManagemment/addAdmin"
            component={AddAdmin}
          />
          <PrivateRoute
            exact
            path="/home/adminManagemment/updateAdmin"
            component={UpdateAdmin}
          />
          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default ContentMain;
