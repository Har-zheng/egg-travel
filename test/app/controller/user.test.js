'use strict';

const { app } = require('egg-mock/bootstrap');

describe('user test', () => {
  it('user index', () => {
    return app.httpRequest()
      .get('/user')
      .expect(200)
      .expect('user index zhz 321');
  });
  it('user listts', async () => {
    await app.httpRequest()
      .get('/user/lists')
      .expect(200)
      .expect('[{"id":1234}]');
  });
  it('user detail', async () => {
    await app.httpRequest()
      .get('/user/detail?id=123')
      .expect(200)
      .expect('123');
  });
});
