import 'babel-polyfill';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

import App from './App';
import router from './router';
import store from './store';
import 'styles/index.less'; // 全局自定义的css样式

Vue.use(ElementUI);
Vue.component('icon', Icon)

function hasPermission(roles, permissionRoles) {
  // if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
  // if (!permissionRoles) return true;
  // return roles.some(role => permissionRoles.indexOf(role) >= 0)
  return true;
}

// register global progress.
const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  next();
  // if (store.getters.token) { // 判断是否有token
  //   if (to.path === '/login') {
  //     next({ path: '/' });
  //   } else {
  //     if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
  //       store.dispatch('GetInfo').then(res => { // 拉取user_info
  //         const roles = res.data.role;
  //         store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
  //           router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
  //           next(to); // hack方法 确保addRoutes已完成
  //         })
  //       }).catch(err => {
  //         console.log(err);
  //       });
  //     } else {
  //       // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
  //       if (hasPermission(store.getters.roles, to.meta.role)) {
  //         next();//
  //       } else {
  //         next({ path: '/401', query: { noGoBack: true } });
  //       }
  //       // 可删 ↑
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next('/login'); // 否则全部重定向到登录页
  //   }
  // }
});


router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

// 生产环境错误日志
if (process.env === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}

export default new Vue({
  router,
  store,
  render: h => h(App)
})


