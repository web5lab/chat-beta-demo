const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  msg: { type: String, required: true },
  userDetails: { type: mongoose.Types.ObjectId, ref: "userDetails" },
  files:{ type: String },
},{ timestamps: true });

const globlaChat = mongoose.model("chats", schema);

module.exports = globlaChat;
