import {
  queryBookClassCount,
  queryBookClassOutCount,
  queryBookCountLimitTen
} from "../services/book";
import { queryUserBorrowCount } from "../services/reader";

export default {
  namespace: "home",

  state: {
    bookClass: [],
    bookClassCount: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        // console.log(location.pathname);
      });
    }
  },

  effects: {
    *queryBookClassCount({ payload, callback }, { select, call, put }) {
      const response = yield call(queryBookClassCount, payload);
      if (response.success) {
        let bookClass = [];
        let bookClassCount = [];
        response.result.map(item => {
          bookClass.push(item.class_name);
          bookClassCount.push(item.num);
        });
        callback(bookClass, bookClassCount);
      }
    },
    *queryBookClassOutCount({ payload, callback }, { select, call, put }) {
      const response = yield call(queryBookClassOutCount, payload);
      if (response.success) {
        let bookClass = [];
        let num = [];
        response.result.map(item => {
          bookClass.push(item.class_name);
          num.push(item.num);
        });
        callback(bookClass, num);
      }
    },
    *queryUserBorrowCount({ payload, callback }, { select, call, put }) {
      const response = yield call(queryUserBorrowCount, payload);
      if (response.success) {
        let realName = [];
        let num = [];
        response.result.map(item => {
          realName.push(item.name);
          num.push(item.value);
        });
        callback(realName, response.result);
      }
    },
    *queryBookCountLimitTen({ payload, callback }, { select, call, put }) {
      const response = yield call(queryBookCountLimitTen, payload);
      if (response.success) {
        let bookName = [];
        let num = [];
        response.result.map(item => {
          bookName.push(item.name);
          num.push(item.value);
        });
        callback(bookName, response.result);
      }
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
