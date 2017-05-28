import { login, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

const SET_PHONE = 'SET_PHONE'
const SET_NAME = 'SET_NAME'
const SET_PERMISSIONS = 'SET_PERMISSIONS'

const user = {
  state: {
    phone: decodeURIComponent(Cookies.get('phone') || ''),
    name: decodeURIComponent(Cookies.get('name') || ''),
    permissions: [],
  },

  mutations: {
    [SET_PHONE](state, phone) {
      state.phone = phone
    },
    [SET_NAME](state, name) {
      state.name = name
    },
    [SET_PERMISSIONS](state, permissions) {
      state.permissions = permissions
    }
  },

  actions: {
    Login({ commit }, { phone, password }) {
      return new Promise((resolve, reject) => {
        phone = phone.trim();
        login(phone, password).then(response => {
          const name = response.data.name.trim();
          commit(SET_PHONE, phone);
          commit(SET_NAME, name);

          Cookies.set('phone', encodeURIComponent(phone));
          Cookies.set('name', encodeURIComponent(name));
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit(SET_PERMISSIONS, data.role);
          commit(SET_NAME, data.name);
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
