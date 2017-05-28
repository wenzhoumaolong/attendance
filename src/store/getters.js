const getters = {
  sidebar: state => state.app.sidebar,
  name: state => state.user.name,
  phone: state => state.user.phone,
  permissions: state => state.user.permissions,
  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters
