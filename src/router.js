import React from "react";
import { BrowserRouter, Route, Switch, browserHistory } from "dva/router";
import Login from "./routes/Login/index";
import PrivateRoute from "./components/PrivateRoute";
import Index from "./routes/Index/index";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

function RouterConfig({ history }) {
  return (
    <BrowserRouter history={browserHistory}>
      <LocaleProvider locale={zh_CN}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/" component={Index} />
        </Switch>
      </LocaleProvider>
    </BrowserRouter>
  );
}

export default RouterConfig;
