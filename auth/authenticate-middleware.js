/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = {
  authenticate
};

function authenticate() {
  return async (req, res, next) => {
    const authError = {
      message: "Invalid Credentials"
    };
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ you: "shall not pass!" });
      }
      console.log(token);
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedPayload) => {
        // if (err) {
        // console.log(err)
        //   return res.json(401).json(authError);
        // }
        req.token = decodedPayload;
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}
