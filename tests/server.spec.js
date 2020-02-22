const supertest = require('supertest');
const server = require('../api/server.js');

const apiBase = '/api';

describe('server.js', () => {
  it('should set testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe(`GET ${apiBase}`, () => {
    // http status code
    it('should return 204 No Content', async (done) => {
      const res = await supertest(server).get(apiBase);
      expect(res.status).toBe(204);
      done();
    });
  
    // shape of the response
    it('body should be empty', async (done) => {
      const body = {};
      const res = await supertest(server).get(apiBase);
      expect(res.body).toEqual(body);
      done();
    });
  });
});
