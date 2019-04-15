import { sendRequest } from "../utils/request";

export function addBook(params) {
  return sendRequest("/api/book/addBook", {
    method: "POST",
    params: params
  });
}

export function addBookClass(params) {
  return sendRequest("/api/book/addBookClass", {
    method: "POST",
    params: params
  });
}

export function deleteBook(params) {
  return sendRequest("/api/book/deleteBook", {
    method: "POST",
    params: params
  });
}

export function deleteBookClass(params) {
  return sendRequest("/api/book/deleteBookClass", {
    method: "POST",
    params: params
  });
}

export function updateBook(params) {
  return sendRequest("/api/book/updateBook", {
    method: "POST",
    params: params
  });
}

export function queryBookByParams(params) {
  return sendRequest("/api/book/queryBookByParams", {
    method: "GET",
    params: params
  });
}

export function queryBookByFuzzyAndPage(params) {
  return sendRequest("/api/book/queryBookByFuzzyAndPage", {
    method: "GET",
    params: params
  });
}

export function queryBookClass(params) {
  return sendRequest("/api/book/queryBookClass", {
    method: "GET",
    params: params
  });
}

export function addBorrow(params) {
  return sendRequest("/api/borrow/addBorrow", {
    method: "POST",
    params: params
  });
}

export function queryBorrowByFuzzyAndPage(params) {
  return sendRequest("/api/borrow/queryBorrowByFuzzyAndPage", {
    method: "GET",
    params: params
  });
}

export function deleteBorrow(params) {
  return sendRequest("/api/borrow/deleteBorrow", {
    method: "POST",
    params: params
  });
}

export function updateBorrow(params) {
  return sendRequest("/api/borrow/updateBorrow", {
    method: "POST",
    params: params
  });
}
