'use strict';

const dayjs = require('dayjs');
const fs = require('fs');
module.exports = options => {
  return async (ctx, next) => {
    const sTime = Date.now();
    const startTime = dayjs(Date.now()).format('YYYY-MM-DD  HH:mm:ss');
    const req = ctx.request;
    console.log(options);
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
    const data = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' [httpLog] ' + JSON.stringify(log) + '\r\n';
    fs.appendFileSync(ctx.app.baseDir + '/httpLog.log', data);
  };
};
// 交易组件, 小程序新支付校验支付成功后, 调用同步订单支付结果失败, 一直提示订单不存在 求解答 ?

// 请求参数
openid: "oU-wC5CnQ9qWxt1u8CgyzPo9NqXk"
out_order_id: "6696f86bdf-m6blw202109220919007"
//响应参数
errcode: 1010011
errmsg: "订单不存在 rid: 614a84bd-1107c3f9-782dc0b3"

// 并且使用最新的支付校验 success 成功后直接调用同步订单支付结果 就出现上面的 订单不存在  很疑惑啊  大佬们
wx.requestOrderPayment({
  timeStamp: '',
  nonceStr: '',
  package: '',
  signType: 'MD5',
  paySign: '',
  orderInfo: { ...}, // 需要新增的 订单 信息
  success(res) { },
  fail(res) { }
})