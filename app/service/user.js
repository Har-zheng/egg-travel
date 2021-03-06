'use strict';

const md5 = require('md5')
const BaseService = require('./base')
class UserService extends BaseService {
  async getUser(username, password) {

    return this.run(async () => {
      const { ctx, app } = this;
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username }
      const result = ctx.model.User.findOne({
        where: _where
      });
      return result;
    })

  }
  async add(params) {
    return this.run(async () => {
      const { ctx } = this
      const result = ctx.model.User.create(params)
      return result
    })
  }
}

module.exports = UserService;
