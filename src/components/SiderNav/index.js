import React from "react";
import CustomMenu from "../CustomMenu/index";
import styles from "./style.css";

const menus = [
  {
    title: "仪表盘",
    icon: "home",
    key: "/home",
    who: ["reader", "admin"]
  },
  {
    title: "管理员管理",
    icon: "lock",
    key: "/home/adminManagemment",
    who: ["admin"],
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
    who: ["admin"],
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
    who: ["admin"],
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
    who: ["admin"],
    subs: [
      {
        key: "/home/circulateManagemment/borrowHistory",
        title: "借还记录",
        icon: "",
        role: ["1", "2", "3"]
      }
    ]
  },
  {
    title: "修改个人资料",
    icon: "user",
    key: "/home/reader/updateInf",
    who: ["reader"]
  },
  {
    title: "查询图书",
    icon: "book",
    key: "/home/reader/queryBook",
    who: ["reader"]
  },
  {
    title: "借阅记录",
    icon: "read",
    key: "/home/reader/queryBorrow",
    who: ["reader"]
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
