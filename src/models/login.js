import { queryAdminByParams } from "../services/admin";

export default {
  namespace: "login",

  state: {
    list: [],
    pagination: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  },

  effects: {
    *queryAdminByParams({ payload }, { select, call, put }) {
      const response = yield call(queryAdminByParams, payload);
      if (response.result) {
        let list = response.result;
        yield put({
          type: "updateState",
          payload: {
            list
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
