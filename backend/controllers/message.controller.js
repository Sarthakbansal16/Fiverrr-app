import { ApiResponse } from "../utils/ApiResponse.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res, next) => {
  const newMessage = Message.create({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    return res
      .status(201)
      .json(new ApiResponse(201, newMessage, "new message has been sent"));
  } catch (err) {
    next(err);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    return res
      .status(200)
      .json(new ApiResponse(200, messages, "Message has been fetched"));
  } catch (err) {
    next(err);
  }
};
