'use strict';
const Controller = require('egg').Controller;
const md5 = require('md5')
const dayjs = require('dayjs')
const BaseController = require('./base')


class UseController extends BaseController {
  async jwtSign() {
    const { ctx, app } = this;
    const username = ctx.params('username');
    const token = app.jwt.sign({
      username
    }, app.config.jwt.secret)
    await app.redis.set(username, token, 'EX', app.config.redisExpire)
    return token
  }
  // 封装统一返回

  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, ['password']),
      createTime: ctx.helper.timestamap(result.createTime),
    }
  }
  async register() {
    const { ctx, app } = this;
    const parmes = ctx.params();
    const user = await ctx.service.user.getUser(parmes.username)
    if (user) {
      this.error('用户已存在')
      return;
    }

    const result = await ctx.service.user.add(
      {
        ...parmes,
        password: md5(parmes.password + app.config.salt),
        createTime: ctx.helper.time()

      })
    if (result) {
      const token = await this.jwtSign()
      this.success({
        ...this.parseResult(ctx, result),
        token
      })

    } else {
      this.error('注册失败!')
    }
  }
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    const user = await ctx.service.user.getUser(username, password)
    if (user) {
      const token = await this.jwtSign()
      ctx.session[username] = 1
      this.success({
        ...this.parseResult(ctx, user),
        token
      })

    } else {
      this.error('该用户不存在')
    }
  }
  async detail() {
    const { ctx } = this;
    if (!ctx.username) {
      return this.error('该用户不存在')
    }
    const user = await ctx.service.user.getUser(ctx.username);
    console.log(user);
    if (user) {
      this.success({
        ...this.parseResult(ctx, user)
      })
    } else {
      this.error('该用户不存在')
    }
  }
  async logout() {
    const { ctx } = this;
    try {
      ctx.session[ctx.username] = null
      this.success('ok')
    } catch (error) {
      this.error('退出登录失败!')
    }
  }
}

module.exports = UseController;
