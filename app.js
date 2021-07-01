// 'use strict';

module.exports = app => {
  const store = {};
  app.sessionStore = {
    async get(key) { 
      console.log('store',  store);
      return store[key];
     },
     async set(key, value, _maxAge){
       store[key] = value;
     },
     async destoty(key){
      store[key] = null
     }
  }
}