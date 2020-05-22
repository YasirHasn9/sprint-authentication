const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-models");

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

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
