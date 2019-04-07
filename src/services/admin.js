import { sendRequest } from "../utils/request";

export function queryAdminByParams(params) {
  return sendRequest("/api/admin/queryAdminByParams", {
    method: "POST",
    params: params
  });
}

export function queryAdminByPage(params) {
  return sendRequest("/api/admin/queryAdminByPage", {
    method: "GET",
    params: params
  });
}
