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
  queryBorrowByFuzzyAndPage
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
    isDeleteSuccess: false
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
    *addBook({ payload }, { select, call, put }) {
      const response = yield call(addBook, payload);
      yield put({
        type: "updateState",
        payload: {
          isAddBookSuccess: response.result
        }
      });
    },
    *addBorrow({ payload }, { select, call, put }) {
      console.log(payload);
      const response = yield call(addBorrow, payload);
      yield put({
        type: "updateState",
        payload: {}
      });
    },
    *addBookClass({ payload }, { select, call, put }) {
      const response = yield call(addBookClass, payload);
      yield put({
        type: "updateState",
        payload: {
          isaddBookClassSuccess: response.result
        }
      });
    },
    *updateBook({ payload }, { select, call, put }) {
      const response = yield call(updateBook, payload);
      yield put({
        type: "updateState",
        payload: {
          isUpdateSuccess: response.result
        }
      });
    },
    *deleteBook({ payload }, { select, call, put }) {
      const response = yield call(deleteBook, payload);
      yield put({
        type: "updateState",
        payload: {
          isDeleteSuccess: response.result
        }
      });
    },
    *deleteBookClass({ payload }, { select, call, put }) {
      const response = yield call(deleteBookClass, payload);
      yield put({
        type: "updateState",
        payload: {}
      });
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
