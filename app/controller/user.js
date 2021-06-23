'use strict';
const Controller = require('egg').Controller;

class UseController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'user index zhz 321';
    await ctx.render('user.html', { id: 100, name: 'admin', lists: [ 'java', 'php', 'ts' ] });
  }
  async lists() {
    const { ctx } = this;
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    ctx.body = [{ id: 1234 }];
  }
  async detail() {
    const { ctx } = this;
    const res = ctx.service.user.detail(10);
    console.log(res);
    ctx.body = res;
  }
  async detail2() {
    const { ctx } = this;
    console.log(ctx.query);
    ctx.body = ctx.params.id;
  }
  async add() {
    const { ctx } = this;
    console.log(ctx);
    const rule = {
      name: { type: 'string' },
      age: { type: 'number' },
    };
    ctx.validate(rule);
    ctx.body = {
      status: 200,
      data: ctx.request.body,
    };
  }
  async edit() {
    const { ctx } = this;
    ctx.body = ctx.request.body;
  }
  async del() {
    const { ctx } = this;
    ctx.body = 'del';
  }
}

module.exports = UseController;
