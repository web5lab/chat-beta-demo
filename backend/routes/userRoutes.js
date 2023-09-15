const express = require("express");
const router = express.Router();
const userController =  require("../controller/userController");
const {upload} = require("../utils/uploadUtils");
const { varifyJwtToken } = require("../utils/jwtUtils");

// API => GET
router.get("/oauth-github", userController.githubAuth);
router.get("/media/:name", userController.getMedia);

// API => PATCH
router.patch("/update-profile-pic", upload.single("image") , userController.updateProfilePic);
router.patch("/update-name",varifyJwtToken,  userController.updateName);

module.exports = router;
