
module.exports = app => {
  const store = {};
  app.sessionStore = {
    async get(key) {
      return store[key];
    },
    async set(key, value, _maxAge) {
      store[key] = value;
    },
    async destroy(key) {
      store[key] = null
    }
  }
  app.config.coreMiddlewares.push('auth')
}