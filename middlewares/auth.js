var jwt = require("jsonwebtoken");

exports.generateJWT = async (user) => {
  try {
    var token = await jwt.sign({ userId: user.id }, "thesecret");
    return token;
  } catch (error) {
    return error;
  }
};

exports.verifyToken = async (req, res, next) => {
  var token = req.headers.autorization || "";
  try {
    if (token) {
      var payload = await jwt.verify(token, "thesecret");
      console.log(payload);
      var user = {
        userId: payload.userId,
        token: token,
      };
      req.user = user;
      req;
      next();
    } else {
      res.status(401).json({
        success: false,
        error: "unautenticated",
      });
    }
  } catch (error) {
    next(error)
  }
};
