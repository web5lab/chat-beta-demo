const chatSchema = require("../mongoDb/schema/chatSchema");

const baseChatId = 1000

const getChats = async (req , res) => {
  const {page} = req.query
};

const postChats = async (req, res) => {
  const {chat} = req.body;
  
};

module.exports = {
  getChats,
  postChats,
};
