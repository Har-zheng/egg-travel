'use strict';
module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    const user = await ctx.app.redis.get(ctx.username);
    console.log('user', user);
    if (!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        error: '用户未登录',
      };
    } else {
      await next();
    }
  };
};
