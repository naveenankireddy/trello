var express = require("express");
var router = express.Router();
var User = require("../../models/users");
var auth = require("../../middlewares/auth");

//register user

router.post("/", async (req, res, next) => {
  try {
    var user = await User.create(req.body.user);
    var token = await auth.generateJWT(user);
    res.status(201).json({
      username: user.username,
      email: user.email,
      token,
    });
    console.log(token);
  } catch (error) {
    next(error);
  }
});

//login user
router.post("/login", async (req, res, next) => {
  var { email, password } = req.body.user;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      error: "Email/Password is mandatory",
    });

  try {
    var user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, error: "Email is invalid" });
    if (!user.verifyPassword(password))
      return res
        .status(400)
        .json({ success: false, error: "Password is invalid" });
    var token = await auth.generateJWT(user);
    res.status(200).json({
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
