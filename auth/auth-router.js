const router = require("express").Router();
const bcrypt = require("bcryptjs");
router.post("/register",async  (req, res , next) => {
  // implement registration
  const authError = {
    message:"Invalid Credentials"
  }
  try{
     const credentials = req.body
     const rounds = process.env.ROUNDS_HASH || 12
     const hash = bcrypt.hashSync(credentials.password , rounds)
     credentials.password = hash
     
  } catch(err){
    throw err
  }
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
