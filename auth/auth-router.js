const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-models");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials"
  };
  try {
    const credentials = req.body;
    const rounds = process.env.HASH_ROUNDS || 12;

    // hash password
    const hash = bcrypt.hashSync(credentials.password, rounds);
    // reassigned the password to hash
    credentials.password = hash;
    const user = await Users.add(credentials);
    if (!user) {
      return res.status(401).json({ message: authError });
    }
    res.status(201).json(user);
  } catch (err) {
    console.log("/register", err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  // implement login
  const authError = {
    message: "Invalid Credentials"
  };
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = {
        user: user.id,
        username: user.username
      };
      const secret = process.env.TOKEN_SECRET || "it's just a secret";
      const token = jwt.sign(payload, secret);
      res.cookie("token", token);
      return res
        .status(201)
        .json({ message: `welcome ${user.username}`, token });
    } else {
      return res.status(401).json(authError);
    }
  } catch (err) {
    console.log("/login", err);
    next(err);
  }
});

module.exports = router;
