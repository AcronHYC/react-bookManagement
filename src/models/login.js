import { queryAdminByParams, login } from "../services/admin";

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
    *login({ payload, callback }, { select, call, put }) {
      const response = yield call(login, payload);
      if (response.result) {
        let list = response.result;
        callback(list);
      }
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
