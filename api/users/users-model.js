const db = require('../../database/dbConfig.js');

module.exports = {
  createUser,
  readUsers,
  readUserById,
  readUserByName,
  updateUser,
  deleteUser,
};

async function createUser(user) {
  if (user) {
    if (!process.env.NO_LOGGER) console.log(`TCL: createUser -> user`, user);
    return await db("users")
      .insert(user)
      .then(u => this.readUserById(u[0]));
  } else {
    return null;
  };
};

async function readUsers() {
  return await db("users");
};
async function readUserById(id) {
  if (id) {
    return await db("users")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
async function readUserByName(username) {
  if (username) {
    return await db("users")
      .where("username", username)
      .first();
  } else {
    return null;
  };
};

async function updateUser(id, userUpdate) {
  if (id && userUpdate) {
    return await db("users")
      .update(userUpdate)
      .then(count => (count > 0 ? this.readUserById(id) : null));
  } else {
    return null;
  };
};

async function deleteUser(id) {
  if (id) {
    return await db("users")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};