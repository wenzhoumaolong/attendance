import Vue from 'vue';
import Router from 'vue-router';

import Layout from '../views/layout/Layout';
import Login from '../views/login/Login';

const Introduction = resolve => require(['../views/introduction/index'], resolve);

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 */
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: Introduction }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'th-large',
    noDropdown: true,
    children: [{ path: 'index', component: Introduction, name: '简述' }]
  }
]

export default new Router({
  mode: 'history', //后端支持可开
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'th-large',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: Introduction, name: '权限测试页', meta: { role: ['admin'] } }]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'th-large',
    children: [
      { path: 'index', component: Introduction, name: '介绍 ' },
      { path: 'tinymce', component: Introduction, name: '富文本编辑器' },
      { path: 'markdown', component: Introduction, name: 'Markdown' },
      { path: 'jsoneditor', component: Introduction, name: 'JSON编辑器' },
      { path: 'dndlist', component: Introduction, name: '列表拖拽' },
      { path: 'splitpane', component: Introduction, name: 'SplitPane' },
      { path: 'avatarupload', component: Introduction, name: '头像上传' },
      { path: 'dropzone', component: Introduction, name: 'Dropzone' },
      { path: 'sticky', component: Introduction, name: 'Sticky' },
      { path: 'countto', component: Introduction, name: 'CountTo' },
      { path: 'mixin', component: Introduction, name: '小组件' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
