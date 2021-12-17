const Service = require('egg').Service;

class BaseService extends Service {
  async run(callback) {
    const { ctx, app } = this;
    try {
      if (callback)
        return callback(ctx, app)
    } catch (error) {
      return null
    }
  }
}

module.exports = BaseService;