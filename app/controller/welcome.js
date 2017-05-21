module.exports = app => {
  return class WelcomeController extends app.Controller {
    * index() {
      this.ctx.body = '这是local环境，暂时仅提供REST API，请输入http://localhost:8080来访问前端界面';
    }
  }
}
