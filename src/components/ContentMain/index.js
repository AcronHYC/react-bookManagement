import React, { Component } from "react";
import { withRouter, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import LoadableComponent from "../../utils/LoadableComponent";
import dynamic from "dva/dynamic";
import app from "../../index";

const Home = LoadableComponent(() => import("../../routes/Home"));

const QueryAdmin = LoadableComponent(() =>
  import("../../routes/Admin/queryAdmin")
);
const AddAdmin = LoadableComponent(() => import("../../routes/Admin/addAdmin"));
const UpdateAdmin = LoadableComponent(() =>
  import("../../routes/Admin/updateAdmin")
);

const QueryReader = LoadableComponent(() =>
  import("../../routes/Reader/queryReader")
);
const AddReader = LoadableComponent(() =>
  import("../../routes/Reader/addReader")
);

const AddBook = LoadableComponent(() => import("../../routes/Book/addBook"));
const QueryBook = LoadableComponent(() =>
  import("../../routes/Book/queryBook")
);
const UpdateBook = LoadableComponent(() =>
  import("../../routes/Book/updateBook")
);

const QueryBorrow = LoadableComponent(() =>
  import("../../routes/Borrow/queryBorrow")
);

const UserQueryBorrow = LoadableComponent(() =>
  import("../../routes/userLogin/queryBorrow")
);

const UserUpdateInf = LoadableComponent(() =>
  import("../../routes/userLogin/updateInf")
);

const UserQueryBook = LoadableComponent(() =>
  import("../../routes/userLogin/queryBook")
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
          <PrivateRoute exact path="/home" component={Home} />
          {/* 管理员模块路由 */}
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
          {/* 读者模块路由 */}
          <PrivateRoute
            exact
            path="/home/readerManagement/queryReader"
            component={QueryReader}
          />
          <PrivateRoute
            exact
            path="/home/readerManagement/addReader"
            component={AddReader}
          />
          {/* 图书模块路由 */}
          <PrivateRoute
            exact
            path="/home/bookManagement/addBook"
            component={AddBook}
          />
          <PrivateRoute
            exact
            path="/home/bookManagement/queryBook"
            component={QueryBook}
          />
          <PrivateRoute
            exact
            path="/home/bookManagement/updateBook"
            component={UpdateBook}
          />

          {/* 借阅模块路由 */}
          <PrivateRoute
            exact
            path="/home/circulateManagemment/borrowHistory"
            component={QueryBorrow}
          />

          {/* 读者登录模块路由 */}
          <PrivateRoute
            exact
            path="/home/reader/queryBorrow"
            component={UserQueryBorrow}
          />
          <PrivateRoute
            exact
            path="/home/reader/updateInf"
            component={UserUpdateInf}
          />
          <PrivateRoute
            exact
            path="/home/reader/queryBook"
            component={UserQueryBook}
          />

          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default ContentMain;
