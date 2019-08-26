import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("access_token") || "",
    user: {
      name: localStorage.getItem("user") || "",
      role: localStorage.getItem("role") || ""
    }
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token.token;
      state.user.name = token.userName;
      state.user.role = token.role;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user.name = "";
      state.user.role = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost/auth-jwt-slim3/api/v1/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            // if (!resp.error && resp.error !== "undefined") {
            const token = resp.data["access_token"];
            const userName = resp.data["user"];
            const role = resp.data["role"];

            // const user = resp.data.user;
            // console.log(resp);
            localStorage.setItem("access_token", token);
            localStorage.setItem("user", userName);
            localStorage.setItem("role", role);
            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", { token, userName, role });
            resolve(resp);
            /* }else{
              reject(resp);
              commit("auth_error");
              localStorage.removeItem("acces_token");
            } */
          })
          .catch(err => {
            commit("auth_error");
            localStorage.clear();
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.clear();
        // localStorage.removeItem("vuex");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  }
});

export default store;
