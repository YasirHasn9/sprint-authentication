const db = require("../database/dbConfig");
module.exports = {
  find,
  add
};

function find() {
  return db("users");
}

async function add(filter) {
  try {
    const [id] = await db("users").insert(add);
    return db("users")
      .where({ id })
      .first();
  } catch (err) {
    console.log("ADD", err);
    throw err;
  }
}
