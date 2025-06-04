const mongoose = require("mongoose");

const thirdAuthySchema = new mongoose.Schema({
  provider: String,
  providerId: String,
  name: String,
  email: String,
  avatar: String,
});

module.exports = mongoose.model("ThirdAuthy", thirdAuthySchema);