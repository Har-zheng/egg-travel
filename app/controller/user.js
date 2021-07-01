'use strict';
const Controller = require('egg').Controller;

class UseController extends Controller {
  async index() {
    const { ctx } = this;
    // 中文cookie
    ctx.cookies.set('zh', '测试', { encrypt: true });
    const user = ctx.cookies.get('user');
    // ctx.body = 'user index zhz 321';
    await ctx.render('user.html', {
      id: 100, name: 'admin',
      user: user ? JSON.parse(user) : null,
      // eslint-disable-next-line array-bracket-spacing
      lists: ['java', 'php', 'ts'],
    });
    // 获取session
    const session = ctx.session.user;
    const zh = ctx.session.zh;
    console.log(session);
    console.log(zh);
  }
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    console.log(ctx.request.body);
    ctx.cookies.set('user', JSON.stringify(body), { maxAge: 1000 * 60 * 10, httpOnly: false });

    // 保存session
    ctx.session.user = body;
    ctx.session.zh = '宏振';

    ctx.body = {
      status: 200,
      data: body,
    };
  }

  async logout() {
    const { ctx } = this;

    ctx.cookies.set('user', null);
    ctx.session.user = null;
    ctx.body = {
      status: 200,
    };
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
