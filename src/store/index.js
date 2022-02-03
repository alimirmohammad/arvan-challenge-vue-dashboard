import Vue from "vue";
import Vuex from "vuex";
import { MUTATIONS_NAMES } from "../constants/mutation-names";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    username: "",
  },
  getters: {
    isAuthenticated({ token }) {
      return Boolean(token);
    },
  },
  mutations: {
    [MUTATIONS_NAMES.AUTHENTICATE](state, payload) {
      state.token = payload.token;
      state.username = payload.username;
    },
    [MUTATIONS_NAMES.LOGOUT](state) {
      state.token = "";
      state.username = "";
    },
    [MUTATIONS_NAMES.SET_TOKEN](state, payload) {
      state.token = payload.token;
    },
    [MUTATIONS_NAMES.SET_USERNAME](state, payload) {
      state.username = payload.username;
    },
  },
  actions: {},
});
