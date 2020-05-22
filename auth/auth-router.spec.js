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

  it("POST /register", async () => {
    const user = { username: "Yasir", password: "yasir" };
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(user);
      if(res.body){
          return  expect(res.status).toBe(201)
      } else {
        return  expect(res.status).toBe(401)
      }
  });

  it("POST /login", async () => {
    // let hash = bcrypt.hash("GuessWhat?", 14)
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "Yasir", password: "yasir?" });
      
     if(res.body.message = "Invalid Credentials"){
         return expect(res.status).toBe(401)
     } else {
         return expect(res.status).toBe(201)
     }
    expect(res.type).toBe("application/json");
  });
  test("login", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "Yasir", password: "yasir!"})
    expect(res.status).toBe(401)
    expect(res.body.message).toBe("Invalid Credentials")
})
});
