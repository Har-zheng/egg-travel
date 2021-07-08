'use strict';
const path = require('path');

module.exports = {
  // 方法扩展
  package(key) {
    const pack = getPach();
    return key ? pack[key] : pack;
  },
  // 属性扩展
  get allPackage() {
    return getPach();
  },
};

function getPach() {
  const filePath = path.join(process.cwd(), 'package.json');
  const pack = require(filePath);
  return pack;
}
