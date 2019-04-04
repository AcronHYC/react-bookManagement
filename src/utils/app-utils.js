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

export default {
  removeObjUnAttr: removeObjUnAttr,
  isEmpty: isEmpty
};
