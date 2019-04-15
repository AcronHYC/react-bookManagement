import { message, Modal, Button } from "antd";

// 删除对象 undefined 属性
const removeObjUnAttr = function(obj) {
  for (var ix in obj) {
    if (obj[ix] === undefined) {
      delete obj[ix];
    }
  }
  return obj;
};

// 判断一个对象是否为空，
const isEmpty = function(obj) {
  if (obj === null) {
    return true;
  }
  if (obj === "") {
    return true;
  }
  if (obj === undefined) {
    return true;
  }
  return false;
};

//时间戳转换为日期格式
const timestampToTime = function(timestamp) {
  let date = new Date(timestamp);
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = date.getDate() + " ";
  let h = date.getHours() + ":";
  let m = date.getMinutes() + ":";
  let s = date.getSeconds();
  return Y + M + D;
};

const getDay = function(previousDate, nowDate) {
  let previous = new Date(previousDate.replace(/-/g, "/"));
  let now = new Date(nowDate.replace(/-/g, "/"));
  let days = now.getTime() - previous.getTime();
  let day = parseInt(days / (1000 * 60 * 60 * 24));
  return day.toString();
};

const getOverdue = function(real_borrow_day, borrow_day) {
  let overdue = parseInt(real_borrow_day, 10) - parseInt(borrow_day, 10);
  return overdue > 0 ? overdue.toString() : "0";
};

export default {
  removeObjUnAttr: removeObjUnAttr,
  isEmpty: isEmpty,
  timestampToTime: timestampToTime,
  getDay: getDay,
  getOverdue: getOverdue
};
