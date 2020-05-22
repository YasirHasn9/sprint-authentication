const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { authenticate } = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");
const usersRouter = require("../users/user-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/jokes", authenticate(), jokesRouter);

server.get("/", (req, res) => {
  res.json({ message: "up" });
});

module.exports = server;
