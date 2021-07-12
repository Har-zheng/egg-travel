'use strict';

module.exports = {
  base64Encode(str = '') {
    return new Buffer.from(str).toString('base64');
  },
};
