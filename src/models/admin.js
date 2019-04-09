import {
  queryAdminByParams,
  queryAdminByPage,
  queryAdminByFuzzyAndPage,
  addAdmin,
  updateAdmin,
  deleteAdmin
} from "../services/admin";

export default {
  namespace: "admin",

  state: {
    list: [],
    pagination: {},
    selectAdmin: {},
    isAddSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location.pathname);
        // if (location.pathname === "/home/adminManagemment/queryAdmin") {
        // dispatch({
        //   type: "queryAdminByPage",
        //   payload: {}
        // });
        // }
      });
    }
  },

  effects: {
    *queryAdminByParams({ payload }, { select, call, put }) {
      const response = yield call(queryAdminByParams, payload);
      if (response.result) {
        let list = response.result;
        if (list.length === 1) {
          yield put({
            type: "updateState",
            payload: {
              selectAdmin: list[0]
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
    },
    *addAdmin({ payload }, { select, call, put }) {
      const response = yield call(addAdmin, payload);
      yield put({
        type: "updateState",
        payload: {
          isAddSuccess: response.result
        }
      });
    },
    *updateAdmin({ payload }, { select, call, put }) {
      const response = yield call(updateAdmin, payload);
      yield put({
        type: "updateState",
        payload: {
          isUpdateSuccess: response.result
        }
      });
    },
    *deleteAdmin({ payload }, { select, call, put }) {
      const response = yield call(deleteAdmin, payload);
      yield put({
        type: "updateState",
        payload: {
          isDeleteSuccess: response.result
        }
      });
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
