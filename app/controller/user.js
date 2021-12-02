'use strict';
const Controller = require('egg').Controller;
const md5 = require('md5')
const dayjs = require('dayjs')

class UseController extends Controller {
  async register() {
    const { ctx, app } = this;
    const parmes = ctx.request.body;
    const user = await ctx.service.user.getUser(parmes.username)
    if (user) {
      ctx.body = {
        status: 500,
        errMsg: '用户已存在'
      }
      return;
    }

    const result = await ctx.service.user.add(
      {
        ...parmes,
        password: md5(parmes.password + app.config.salt),
        createTime: ctx.helper.time()

      })
    if (result) {
      console.log(result);
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(result.dataValues, ['password']),
          createTime: ctx.helper.timestamap(result.createTime)
        }
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: '注册失败!'
      }
    }
  }
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    const user = await ctx.service.user.getUser(username, password)
    if (user) {
      ctx.session.userId = user.id
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ['password']),
          createTime: ctx.helper.timestamap(user.createTime)
        }
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: '该用户不存在'
      }
    }
  }
}

module.exports = UseController;
