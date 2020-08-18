var jwt = require("jsonwebtoken");

exports.generateJWT = async (user) => {
  try {
    var token = await jwt.sign({ userId: user.id }, "thesecret");
    return token;
  } catch (error) {
    return error;
  }
};
