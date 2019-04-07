import {
  queryAdminByParams,
  queryAdminByPage,
  queryAdminByFuzzyAndPage
} from "../services/admin";

export default {
  namespace: "admin",

  state: {
    list: [],
    pagination: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location.pathname);
        if (location.pathname === "/home/adminManagemment/queryAdmin") {
          dispatch({
            type: "queryAdminByPage",
            payload: {}
          });
        }
      });
    }
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
    },
    *queryAdminByPage({ payload }, { select, call, put }) {
      const response = yield call(queryAdminByPage, payload);
      if (response.result.jsonAdminList) {
        let list = response.result.jsonAdminList;
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
    *queryAdminByFuzzyAndPage({ payload }, { select, call, put }) {
      const response = yield call(queryAdminByFuzzyAndPage, payload);
      if (response.result.jsonAdminList) {
        let list = response.result.jsonAdminList;
        let pagination = response.result.pagination;
        yield put({
          type: "updateState",
          payload: {
            list,
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
