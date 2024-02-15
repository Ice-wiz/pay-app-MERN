const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ok:ok@cluster3.pcvqsyk.mongodb.net/");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema); // Provide a unique name for the Account model

module.exports = {
  User,
  Account,
};
