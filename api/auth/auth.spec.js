const supertest = require('supertest');
const server = require('../server.js');

const apiBase = '/api/auth';
const json = 'application/json';

const moment = require('moment');
const d = moment().format("X");

describe('server.js', () => {

  const apiEndpointRegister = apiBase+'/register';
  describe('POST '+apiEndpointRegister, () => {

    it('(missing required data)', async (done) => {
      const reqBody = null;
      const expStatus = 400;
      const resBody = { message: "Required data missing" };
      const res = await supertest(server).post(apiEndpointRegister);
      expect(res.status).toBe(expStatus);
      expect(res.type).toBe(json);
      expect(res.body).toEqual(resBody);
      expect(res.body.user).toBeUndefined();
      done();
    });

    it('(valid)', async (done) => {
      const password = "T3$tP4$$w0rd!";
      const reqBody = {
        username: `TestUser_${d}`,
        password: password,
      };
      const expStatus = 201;
      const resBody = {
        username: `TestUser_${d}`,
      };

      const res = await supertest(server)
        .post(apiEndpointRegister)
        .send(reqBody)
        .set('Accept', json)
        ;

      expect(res.status).toBe(expStatus);
      expect(res.type).toBe('application/json');
      expect(res.body).toMatchObject(resBody);
      expect(res.body.id).toBeGreaterThanOrEqual(1);
      expect(res.body.password).toMatch(/^\$2a\$\d{1,}\$.*/);
      done();
    });

  });


  const apiEndpointLogin = apiBase+'/login';
  describe('POST '+apiEndpointLogin, () => {

    it('(missing required data)', async (done) => {
      const reqBody = null;
      const expStatus = 400;
      const resBody = { message: "Required data missing" };
      const res = await supertest(server).post(apiEndpointLogin);
      expect(res.status).toBe(expStatus);
      expect(res.type).toBe(json);
      expect(res.body).toEqual(resBody);
      expect(res.body.user).toBeUndefined();
      done();
    });

    it('(valid)', async (done) => {
      const u = `TestUser_${d}`;
      const p = "T3$tP4$$w0rd!";

      const reqBody = {
        username: u,
        password: p,
      };
      const expStatus = 200;
      const resBody = {
        message: `Welcome ${u}!`
      };

      const res = await supertest(server)
        .post(apiEndpointLogin)
        .send(reqBody)
        .set('Accept', json)
        ;

      expect(res.status).toBe(expStatus);
      expect(res.type).toBe('application/json');
      expect(res.body).toMatchObject(resBody);
      expect(res.body.token)
        .toMatch(/[\w|-]{1,}\.{1}[\w|-]{1,}\.{1}[\w|-]{1,}/);
      done();
    });

  });
});
