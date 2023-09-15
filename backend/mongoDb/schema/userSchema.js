const mongoose = require("mongoose");

const userDetails = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    profilePic: { type: String },
    userName: { type: String },
    userId: { type: Number },
    provider: { type: String},
  },
  { timestamps: true }
);

const userDetailsModal = mongoose.model("userDetails", userDetails);

userDetails.index({ email: 1 });
userDetails.index({ userName: 1 });
userDetails.index({ userId: 1 });

module.exports = userDetailsModal;
