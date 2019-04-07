import React from "react";
import CustomMenu from "../CustomMenu/index";
import styles from "./style.css";

const menus = [
  {
    title: "首页",
    icon: "home",
    key: "/home"
  },
  {
    title: "管理员管理",
    icon: "lock",
    key: "/home/adminManagemment",
    subs: [
      {
        key: "/home/adminManagemment/updateAdmin",
        title: "修改资料",
        icon: ""
      },
      {
        key: "/home/adminManagemment/queryAdmin",
        title: "管理员列表",
        icon: ""
      },
      { key: "/home/adminManagemment/addAdmin", title: "新增管理员", icon: "" }
    ]
  },
  {
    title: "读者管理",
    icon: "user",
    key: "/home/readerManagement",
    subs: [{ key: "readerManagement", title: "查看读者信息", icon: "" }]
  },
  {
    title: "图书管理",
    icon: "book",
    key: "/home/bookManagemment",
    subs: [
      { key: "/home/bookManagemment/queryBook", title: "图书列表", icon: "" },
      { key: "/home/bookManagemment/addBook", title: "新增图书", icon: "" },
      { key: "/home/bookManagemment/addBookClass", title: "新增分类", icon: "" }
    ]
  },
  {
    title: "借还管理",
    icon: "read",
    key: "/home/circulateManagemment",
    subs: [
      {
        key: "/home/circulateManagemment/borrowBook",
        title: "借书管理",
        icon: ""
      },
      {
        key: "/home/circulateManagemment/lendBook",
        title: "还书管理",
        icon: ""
      }
    ]
  }
];

class SiderNav extends React.Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        {/* <div style={{ height: "70px", width: "100%" }} /> */}
        <CustomMenu menus={menus} />
      </div>
    );
  }
}

export default SiderNav;
