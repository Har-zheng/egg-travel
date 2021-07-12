'use strict';
module.exports = {
  params(key) {
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    }
    // 非 get
    return key ? this.request.body[key] : this.request.body;
  },
};
