const db = require("../database/dbConfig");
module.exports = {
  find,
  add
};

function find() {
  return db("users");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return db("users")
      .where({ id })
      .first();
  } catch (err) {
    console.log("ADD", err);
    throw err;
  }
}


