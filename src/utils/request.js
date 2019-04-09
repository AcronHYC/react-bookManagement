import fetch from "dva/fetch";
import { message } from "antd";
import appUtils from "../utils/app-utils";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const REQUSET_METHOD = {
  GET: "GET",
  POST: "POST"
};

export { REQUSET_METHOD };
/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  return Object.keys(obj)
    .map(key => {
      return key + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}

const errorMessage = {
  400: "请求错误",
  401: "未授权，请重新登入",
  403: "已授权，但访问是被禁止的",
  404: "您访问的页面不存在",
  406: "您请求的格式不正确",
  410: "您请示的资源已经被永久的删除",
  422: "创建对象时，发生验证错误",
  500: "服务器发生错误",
  600: "网络错误"
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function sendRequest(url, options) {
  let searchStr = "";
  let initObj = {};
  let jsonData = "";
  options = appUtils.removeObjUnAttr(options);
  if (options.method === REQUSET_METHOD.GET) {
    if (options.params) {
      searchStr = obj2String(options.params);
      url += "?" + searchStr;
    }
    initObj = {
      method: options.method
    };
  } else if (options.method === REQUSET_METHOD.POST) {
    if (options.params) {
      jsonData = JSON.stringify(options.params);
    }
    initObj = {
      method: options.method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: jsonData,
      credentials: "include"
    };
  }
  return fetch(url, initObj)
    .then(checkStatus)
    .then(parseJSON)
    .then(response => {
      console.log(response);
      return {
        success: true,
        result: response
      };
    })
    .catch(error => {
      // XMLHttpRequest 对象的 status 和 statusText 属性保存有服务器返回的 http 状态码
      const { response } = error; // 接收错误的属性
      let content;
      let status;
      if (response && response instanceof Object) {
        // 如果响应存在，同时响应是一个对象
        status = response.status;
        content = errorMessage[status] || response.statusText;
      } else {
        status = 600;
        content = error.message || "网络错误！";
      }
      // 如果抛出错误，但未得到catch,则会由全局的onError接收
      message.error(content);
      // 如果直接return Promise.reject()的话，会直接抛出浏览器给的错误，比如unauth 一类的，无法返回我们要的对象
      // 所以按默认的，直接返回对象
      return { success: false, status, content };
    });
}
