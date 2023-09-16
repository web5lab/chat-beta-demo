const userModal = require("../mongoDb/schema/userSchema");
const {
  getGithubOathToken,
  getGithubUser,
} = require("../services/githubService");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { createJwtToken } = require("../utils/jwtUtils");
const { httpStatus, responseObject } = require("../utils/otherUtils");
const { emitUserNameChange, emitNewProfile } = require("../socket/socket");

const githubAuth = async (req, res) => {
  try {
    // Get the code from the query
    const code = req.query.code;

    console.log("code: ", code);

    // Get the user the access_token with the code
    const { access_token } = await getGithubOathToken({ code });

    // Get the user with the access_token
    const data = await getGithubUser({
      access_token,
    });

    console.log("data id", data);

    let user;
    user = await userModal.findOne({ userId: data?.id });
    let jwtToken;

    if (user) {
      jwtToken = await createJwtToken({
        id: user._id.toString(),
      });
      res.send({
        user,
        jwtToken: jwtToken,
      });
      return;
    }

    user = await userModal.findOneAndUpdate(
      { userId: data?.id },
      {
        userId: data?.id,
        name: data?.login,
        email: data?.email,
        profilePic: data?.avatar_url,
      },
      { runValidators: false, new: true, upsert: true }
    );

    jwtToken = await createJwtToken({
      id: user._id.toString(),
    });

    res.send({
      user,
      jwtToken: jwtToken,
    });
  } catch (err) {
    console.log(err, "error");
    return res.send(err);
  }
};

const updateProfilePic = async (req, res) => {
  const { id } = req.userPayload;
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

      const ProfilePic =`https://api.cryptomultisend.com/auth/media/${filename}`

    const updateUserData = await userModal.findOneAndUpdate(
      { _id: id },
      { profilePic: ProfilePic },
      { new: true }
    );

    res.send({
      updateUserData,
    });

   await emitNewProfile(ProfilePic,id)
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

    await emitUserNameChange(name, id);

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

const getUser = async (req, res) => {
  const { id } = req.userPayload;
  const user = await userModal.findOne({ _id: id });
  const msg = responseObject(true, false, {
    user,
  });
  res.status(httpStatus.OK).json(msg);
};

module.exports = {
  githubAuth,
  updateProfilePic,
  updateName,
  getMedia,
  getUser,
};
