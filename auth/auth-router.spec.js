const db = require("../database/dbConfig");
const supertest = require("supertest");
const Users = require("../users/users-models");
const server = require("../api/server");
// const bcrypt = require("bcryptjs")

beforeEach(async () => {
  await db("users").truncate();
});

describe("auth router", () => {
  it("all users", async () => {
    const res = await Users.find();
    expect(res.length).toBeGreaterThanOrEqual(0);
  });
});
