import React from "react";
import { BrowserRouter, Route, Switch, browserHistory } from "dva/router";
import Login from "./routes/Login/index";
import PrivateRoute from "./components/PrivateRoute";
import Index from "./routes/Index/index";

function RouterConfig({ history }) {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
}

export default RouterConfig;
