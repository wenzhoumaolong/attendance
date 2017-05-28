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

// register global progress.
const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (store.getters.name) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.permissions.length === 0) { // 判断当前用户是否已拉取完user_info信息
        next();
        // store.dispatch('GetInfo').then(res => { // 拉取user_info
        //   const roles = res.data.role;
        //   store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
        //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //     next(to); // hack方法 确保addRoutes已完成
        //   })
        // }).catch(err => {
        //   console.log(err);
        // });
      } else {
        next();
      }
    }
  } else {
    // 在免登录白名单，直接进入, 否则全部重定向到登录页
    whiteList.indexOf(to.path) !== -1 ? next() : next('/login');
  }
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


