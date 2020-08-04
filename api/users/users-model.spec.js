const db = require('../../database/dbConfig.js');
const Users = require('./users-model.js');

const moment = require('moment');
const d = moment().format("X");

const p = 'P4ssw0rd!';

describe('users model', () => {

  describe('insert', () => {
    it('should insert the provided users into the db and return the records', async () => {
      const users1 = await db('users');
      if (!process.env.NO_LOGGER) console.log(`TCL: users1.length`, users1.length);
      const len = users1.length;

      const l = users1[len-1].id;

      const u0 = await Users.createUser({ username: `TestUser_${l+0}_${d}`, password: p });
      expect(u0.id).toEqual(l+1);
      expect(u0.username).toBe(`TestUser_${l+0}_${d}`);
      expect(u0.password).toBe(p);
      const u1 = await Users.createUser({ username: `TestUser_${l+1}_${d}`, password: p });
      expect(u1.id).toEqual(l+2);
      expect(u1.username).toBe(`TestUser_${l+1}_${d}`);
      expect(u1.password).toBe(p);

      const users2 = await db('users');
      if (!process.env.NO_LOGGER) console.log(`TCL: users2.length`, users2.length);
      expect(users2).toHaveLength(len+2);
    });

    it('should prevent duplicate users from being inserted', async () => {
      const users1 = await db('users');
      if (!process.env.NO_LOGGER) console.log(`TCL: users1.length`, users1.length);
      const len = users1.length;

      const l = users1[len-1].id;
      const u = `TestDupeUser_${l+2}_${d}`;

      const u2 = await Users.createUser({ username: u, password: p })
        .catch(err => {
          if (!process.env.NO_LOGGER) console.log(err);
        });
      const u3 = await Users.createUser({ username: u, password: p })
        .catch(err => {
          if (!process.env.NO_LOGGER) console.log(err);
        });

      const users2 = await db('users');
      if (!process.env.NO_LOGGER) console.log(`TCL: users2.length`, users2.length);
      expect(users2).toHaveLength(len+1);
    });

  });

//TODO!
  // describe('readUserByName', () => {
  //   const u = 'JudgeDoom';

  //   it('should return the named user', async () => {
  //     const r = await Users.readUserByName(u);

  //     expect(r.userData.id).toBeGreaterThanOrEqual(1);
  //     expect(r.userData.username).toBe(u);
  //     expect(r.userData.password).not.toBeUndefined();
  //   });
  // });

});
