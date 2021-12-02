'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.user.detail(20);
    console.log(res);
    ctx.body = res;
  }

  async newApplication() {
    const { ctx, app } = this;
    const packageInfo = app.package('scripts');
    console.log(packageInfo);
    const allPack = app.allPackage;
    console.log(allPack);
    ctx.body = allPack;
  }
  async newContent() {
    const { ctx } = this;
    const parmes = ctx.params();
    ctx.body = parmes;
  }
  async newRquest() {
    const { ctx } = this;
    const parmes = ctx.request.token;
    console.log(parmes);
    ctx.body = parmes;
  }
  async newResponse() {
    const { ctx } = this;
    ctx.response.token = 'abc123000';
    const base64Parse = ctx.helper.base64Encode('非常nice');
    ctx.body = base64Parse;
  }

}

module.exports = HomeController;
