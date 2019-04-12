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

export default {
  removeObjUnAttr: removeObjUnAttr,
  isEmpty: isEmpty,
  timestampToTime: timestampToTime
};
