const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = `欢迎使用bookly后台接口服务`
  }
}

module.exports = HomeController
