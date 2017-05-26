const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  name: state => state.user.name,
  email: state => state.user.email,
  status: state => state.user.status,
  roles: state => state.user.roles,
  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters
