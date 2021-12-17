const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(data = {}) {
    const { ctx } = this;
    ctx.body = {
      status: 200,
      data
    }

  }
  error(error = '') {
    const { ctx } = this;
    ctx.body = {
      status: 500,
      error
    }
  }
}

module.exports = BaseController;