import {
  addBook,
  deleteBook,
  updateBook,
  queryBookByParams,
  queryBookByFuzzyAndPage,
  queryBookClass,
  addBookClass,
  deleteBookClass,
  addBorrow,
  queryBorrowByFuzzyAndPage,
  deleteBorrow,
  updateBorrow,
  queryBorrowByFuzzyAndPageAndUserid
} from "../services/book";
import {
  queryReaderByParams,
  queryReaderByFuzzyAndPage,
  addReader
} from "../services/reader";

export default {
  namespace: "book",

  state: {
    userList: [],
    list: [],
    bookClassList: [],
    pagination: {},
    selectBook: {},
    borrowList: [],
    isAddBookSuccess: false,
    isAddBookClassSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false,
    isDeleteBorrowSuccess: false,
    isUpdateBorrowSuccess: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location.pathname);
      });
    }
  },

  effects: {
    *queryBookByParams({ payload }, { select, call, put }) {
      const response = yield call(queryBookByParams, payload);
      if (response.result) {
        let list = response.result;
        if (list.length === 1) {
          yield put({
            type: "updateState",
            payload: {
              selectBook: list[0]
            }
          });
        } else {
          yield put({
            type: "updateState",
            payload: {
              list
            }
          });
        }
      }
    },
    *queryBookByFuzzyAndPage({ payload }, { select, call, put }) {
      const response = yield call(queryBookByFuzzyAndPage, payload);
      if (response.result.jsonBookList) {
        let list = response.result.jsonBookList;
        let pagination = response.result.pagination;
        yield put({
          type: "updateState",
          payload: {
            list,
            pagination
          }
        });
      }
    },
    *queryBorrowByFuzzyAndPage({ payload }, { select, call, put }) {
      const response = yield call(queryBorrowByFuzzyAndPage, payload);
      if (response.result.jsonBorrowList) {
        let borrowList = response.result.jsonBorrowList;
        let pagination = response.result.pagination;
        yield put({
          type: "updateState",
          payload: {
            borrowList,
            pagination
          }
        });
      }
    },
    *queryBookClass({ payload }, { select, call, put }) {
      const response = yield call(queryBookClass, payload);
      if (response.result) {
        let bookClassList = response.result;
        yield put({
          type: "updateState",
          payload: {
            bookClassList
          }
        });
      }
    },
    *queryUserByParams({ payload }, { select, call, put }) {
      const response = yield call(queryReaderByParams, payload);
      if (response.result) {
        let userList = response.result;
        yield put({
          type: "updateState",
          payload: {
            userList
          }
        });
      }
    },
    *addBook({ payload, callback }, { select, call, put }) {
      const response = yield call(addBook, payload);
      if (response.result) {
        callback(response.result);
      }
    },
    *addBorrow({ payload, callback }, { select, call, put }) {
      console.log(payload);
      const response = yield call(addBorrow, payload);
      if (response.result) {
        callback(response.result);
      }
    },
    *addBookClass({ payload, callback }, { select, call, put }) {
      const response = yield call(addBookClass, payload);
      if (response.result) {
        callback(response.result);
      }
    },
    *updateBook({ payload, callback }, { select, call, put }) {
      const response = yield call(updateBook, payload);
      if (response.result) {
        callback(response.result);
      }
    },
    *updateBorrow({ payload, callback }, { select, call, put }) {
      const response = yield call(updateBorrow, payload);
      if (response.result) {
        callback(response.result);
      }
    },
    *deleteBook({ payload, callback }, { select, call, put }) {
      const response = yield call(deleteBook, payload);
      if (response.result) {
        callback(response.result);
      }
    },
    *deleteBorrow({ payload, callback }, { select, call, put }) {
      const response = yield call(deleteBorrow, payload);
      if (response.result) {
        callback(response.result);
      }
    },
    *deleteBookClass({ payload, callback }, { select, call, put }) {
      const response = yield call(deleteBookClass, payload);
      if (response.result) {
        callback(response.result);
      }
    },
    *queryBorrowByFuzzyAndPageAndUserid({ payload }, { select, call, put }) {
      const response = yield call(queryBorrowByFuzzyAndPageAndUserid, payload);
      if (response.result.jsonBorrowList) {
        let borrowList = response.result.jsonBorrowList;
        let pagination = response.result.pagination;
        yield put({
          type: "updateState",
          payload: {
            borrowList,
            pagination
          }
        });
      }
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
