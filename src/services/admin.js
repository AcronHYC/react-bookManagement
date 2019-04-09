import { sendRequest } from "../utils/request";

export function queryAdminByParams(params) {
  return sendRequest("/api/admin/queryAdminByParams", {
    method: "GET",
    params: params
  });
}

export function queryAdminByPage(params) {
  return sendRequest("/api/admin/queryAdminByPage", {
    method: "GET",
    params: params
  });
}

export function queryAdminByFuzzyAndPage(params) {
  return sendRequest("/api/admin/queryAdminByFuzzyAndPage", {
    method: "GET",
    params: params
  });
}

export function addAdmin(params) {
  return sendRequest("/api/admin/addAdmin", {
    method: "POST",
    params: params
  });
}

export function updateAdmin(params) {
  return sendRequest("/api/admin/updateAdmin", {
    method: "POST",
    params: params
  });
}

export function deleteAdmin(params) {
  return sendRequest("/api/admin/deleteAdmin", {
    method: "POST",
    params: params
  });
}
