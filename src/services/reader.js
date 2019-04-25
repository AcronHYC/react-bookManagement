import { sendRequest } from "../utils/request";

export function queryReaderByParams(params) {
  return sendRequest("/api/user/queryUserByParams", {
    method: "GET",
    params: params
  });
}

export function queryReaderByFuzzyAndPage(params) {
  return sendRequest("/api/user/queryUserByFuzzyAndPage", {
    method: "GET",
    params: params
  });
}

export function addReader(params) {
  return sendRequest("/api/user/addUser", {
    method: "POST",
    params: params
  });
}

export function queryUserBorrowCount(params) {
  return sendRequest("/api/user/queryUserBorrowCount", {
    method: "GET",
    params: params
  });
}
