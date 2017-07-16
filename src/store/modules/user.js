import { loginByEmail, logout, getInfo, LoginByPhone } from 'api/login';
import Cookies from 'js-cookie';

const user = {
  state: {
    user: '',
    status: '',
    email: '',
    token: Cookies.get('Admin-Token'),
    name: '',
    roles: [],
  },

  mutations: {
  },

  actions: {
    // 邮箱登录
    LoginByEmail({ commit }, {email, password}) {
      return new Promise((resolve, reject) => {
        loginByEmail(email.trim(), password).then(response => {
          const data = response.data;
          Cookies.set('Admin-Token', response.data.token);
          commit('SET_TOKEN', data.token);
          commit('SET_EMAIL', email.trim());
          resolve();
        }).catch(error => {
          resolve();
          // reject(error);
        });
      });
    },

    LoginByPhone({ commit }, {phone, password}) {
      return new Promise((resolve, reject) => {
        LoginByPhone(phone.trim(), password).then(response => {
          console.log(response);
          const data = response.data;
          Cookies.set('Admin-Token', response.data.token);
          commit('SET_TOKEN', data.token);
          commit('SET_EMAIL', phone.trim());
          resolve();
        }).catch(error => {
          resolve();
          // reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          resolve(response);
        }).catch(error => {
          // reject(error);
          resolve()
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('Admin-Token');
          resolve();
        }).catch(error => {
          resolve();
          // reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        resolve();
      });
    }
  }
};

export default user;
