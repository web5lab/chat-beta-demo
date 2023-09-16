const chatSchema = require("../mongoDb/schema/chatSchema");
const sharp = require("sharp");
const path = require("path");
const { emitNewChat } = require("../socket/socket");

const baseChatId = 1000;

const getChats = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 100; // Default to 100 items per page

  try {
    const totalChats = await chatSchema.countDocuments();
    const totalPages = Math.ceil(totalChats / pageSize);

    // Ensure the page number is within a valid range
    if (page < 1 || page > totalPages) {
      return res.status(400).json({ error: "Invalid page number" });
    }

    const chats = await chatSchema
      .find({}, { updatedAt: 0, __v: 0 })
      .populate("userDetails", { profilePic: 1, name: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ timeStamp: -1 });

    res.json({
      chats,
      page,
      pageSize,
      totalPages,
      totalChats,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching chats" });
  }
};

const postChats = async (req, res) => {
  const { id } = req.userPayload;
  const { chat } = req.body;

  let imagePath = null;
  if (req.file) {
    const filename = `${Date.now()}-demo-chat${path.extname(
      req.file.originalname
    )}`;
    const outputPath = path.join(__dirname, "../uploads", filename);

    try {
      await sharp(req.file.buffer)
        .toFile(outputPath);

      imagePath = `https://api.cryptomultisend.com/auth/media/${filename}`;
    } catch (err) {
      console.log("Error uploading", err);
      return res.status(500).send("Error processing image");
    }
  }

  const totalchat = await chatSchema.countDocuments();
  const newCode = totalchat + Number(baseChatId);

  const newChat = new chatSchema({
    _id: newCode,
    msg: chat,
    userDetails: id,
    files: imagePath,
  });

  try {
    await newChat.save();
    const chat = await chatSchema
      .findOne({ _id: newCode }, { updatedAt: 0, __v: 0 })
      .populate("userDetails", { profilePic: 1, name: 1 });
     emitNewChat(chat);
    res.status(200).send({
      chat: chat,
    });
  } catch (err) {
    console.log("Error creating chat", err);
    res.status(500).send("Error creating chat");
  }
};

module.exports = {
  getChats,
  postChats,
};
