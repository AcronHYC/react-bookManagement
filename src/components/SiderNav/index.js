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
    // models: () => [import("../../models/admin")],
    subs: [
      {
        key: "/home/adminManagemment/updateAdmin",
        title: "修改资料",
        icon: "",
        role: ["1", "2", "3"]
      },
      {
        key: "/home/adminManagemment/queryAdmin",
        title: "管理员列表",
        icon: "",
        role: ["1", "2", "3"]
      },
      {
        key: "/home/adminManagemment/addAdmin",
        title: "新增管理员",
        icon: "",
        role: ["1"]
      }
    ]
  },
  {
    title: "读者管理",
    icon: "user",
    key: "/home/readerManagement",
    subs: [
      {
        key: "/home/readerManagement/queryReader",
        title: "查看读者信息",
        icon: "",
        role: ["1", "2", "3"]
      },
      {
        key: "/home/readerManagement/addReader",
        title: "新增读者",
        icon: "",
        role: ["1", "2", "3"]
      }
    ]
  },
  {
    title: "图书管理",
    icon: "book",
    key: "/home/bookManagement",
    subs: [
      {
        key: "/home/bookManagement/queryBook",
        title: "图书列表",
        icon: "",
        role: ["1", "2", "3"]
      },
      {
        key: "/home/bookManagement/addBook",
        title: "新增图书及分类",
        icon: "",
        role: ["1", "2"]
      }
    ]
  },
  {
    title: "借还管理",
    icon: "read",
    key: "/home/circulateManagemment",
    subs: [
      {
        key: "/home/circulateManagemment/borrowHistory",
        title: "借还记录",
        icon: "",
        role: ["1", "2", "3"]
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
