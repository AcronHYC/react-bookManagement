import { queryAdminByParams } from "../services/admin";

export default {
  namespace: "admin",

  state: {
    list: [],
    isExist: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    *queryAdminByParams({ payload }, { select, call, put }) {
      const response = yield call(queryAdminByParams, payload);
      let list = response.result;
      if (response.result) {
        yield put({
          type: "updateState",
          payload: {
            list: list
          }
        });
      } else {
        yield put({
          type: "updateState",
          payload: {
            isExist: false
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
