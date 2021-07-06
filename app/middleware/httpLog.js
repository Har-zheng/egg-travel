'use strict';

const dayjs = require('dayjs');

module.exports = () => {
  return async (ctx, next) => {
    const sTime = Date.now();
    const startTime = dayjs(Date.now()).format('YYYY-MM-DD  HH:mm:ss');
    const req = ctx.request;
    await next();
    const log = {
      method: req.method,
      url: req.url,
      data: req.body,
      startTime,
      entTime: dayjs(Date.now()).format('YYYY-MM-DDHH:mm:ss'),
      timeLength: Date.now() - sTime,
    };
    console.log(log);
  };
};
