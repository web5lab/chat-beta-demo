const express = require("express");
const router = express.Router();
const { varifyJwtToken } = require("../utils/jwtUtils");
const chatController = require("../controller/chatController");
const { upload } = require("../utils/uploadUtils");

// API => GET
router.get("/get-Chats", chatController.getChats);

// API => POST
router.post(
  "/post-Chat",
  varifyJwtToken,
  upload.single("image"),
  chatController.postChats
);

module.exports = router;
