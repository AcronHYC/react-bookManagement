import {
  queryReaderByParams,
  queryReaderByFuzzyAndPage,
  addReader
} from "../services/reader";

export default {
  namespace: "reader",

  state: {
    list: [],
    pagination: {},
    selectReader: {},
    isAddSuccess: false
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  },

  effects: {
    *queryUserByParams({ payload }, { select, call, put }) {
      const response = yield call(queryReaderByParams, payload);
      if (response.result) {
        let list = response.result;
        if (list.length === 1) {
          yield put({
            type: "updateState",
            payload: {
              selectUser: list[0]
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
    *queryUserByFuzzyAndPage({ payload }, { select, call, put }) {
      const response = yield call(queryReaderByFuzzyAndPage, payload);
      if (response.result.jsonUserList) {
        let list = response.result.jsonUserList;
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
    *addReader({ payload, callback }, { select, call, put }) {
      console.log(payload);
      const response = yield call(addReader, payload);
      if (response.result) {
        callback(response.result);
      }
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
