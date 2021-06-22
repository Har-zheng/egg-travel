'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = ctx.service.user.detail(20);
    console.log(res);
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
