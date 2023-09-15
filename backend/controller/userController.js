const userModal = require("../mongoDb/schema/userSchema");
const {
  getGithubOathToken,
  getGithubUser,
} = require("../services/githubService");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { createJwtToken } = require("../utils/jwtUtils");

const githubAuth = async (req, res) => {
  try {
    // Get the code from the query
    const code = req.query.code;

    // Get the user the access_token with the code
    const { access_token } = await getGithubOathToken({ code });

    // Get the user with the access_token
    const { id, email, avatar_url, name } = await getGithubUser({
      access_token,
    });


    const user = await  userModal.findOne({userId:id})

    if (user) {
      res.send({
        updateUserData,
        jwtToken: jwtToken,
      });
      return
    }

    const updateUserData = await userModal.findOneAndUpdate(
      { userId: id },
      { userId: id, name: name, email: email, profilePic: avatar_url },
      { runValidators: false, new: true, upsert: true }
    );

    const jwtToken = await createJwtToken({
      id: updateUserData._id.toString(),
    });


    res.send({
      updateUserData,
      jwtToken: jwtToken,
    });
  } catch (err) {
    console.log(err, "error");
    return res.send(err);
  }
};

const updateProfilePic = async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  }

  if (!req.file) {
    return res.status(400).send("Please select an image to upload");
  }

  const filename = `${Date.now()}-demo-chat${path.extname(
    req.file.originalname
  )}`;
  const outputPath = path.join(__dirname, "../uploads", filename);

  try {
    await sharp(req.file.buffer)
      .resize(200, 200, { fit: "inside" })
      .toFile(outputPath);

    res
      .status(200)
      .send({ imagePath: `https://img.dexcrash.com/images/${filename}` });
  } catch (err) {
    console.log("Error uploading", err);
    res.status(500).send("Error processing image");
  }
};

const updateName = async (req, res) => {
  try {
    const { id } = req.userPayload;

    const { name } = req.body;

    const updateUserData = await userModal.findOneAndUpdate(
      { _id: id },
      { name: name },
      { new: true }
    );

    res.send({
      updateUserData,
    });
  } catch (err) {
    console.log(err, "error");
    return res.send(err);
  }
};

const getMedia = async (req, res) => {
  const filepath = path.join(__dirname, "../uploads", req.params.name);
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send("Image not found");
  }
};

module.exports = {
  githubAuth,
  updateProfilePic,
  updateName,
  getMedia,
};
