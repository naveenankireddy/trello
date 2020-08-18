var mongoose = require("mongoose");
// var bcrypt = require("bcrypt")
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.verifyPassword = async function (password) {
  return await compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
