const Chat = require("../Models/messageschema"); // path to your updated chat model
const User = require("../Models/Userschema"); // adjust path as per your structure
const Product = require("../Models/Productschema"); // adjust path

// Create or update chat & send message
exports.sendMessage = async (req, res) => {
  try {
    const { productId, senderId, receiverId, message } = req.body;

    // Check if chat already exists between the two users for the product
    let chat = await Chat.findOne({
      productId
    //   $or: [
    //     { senderId, receiverId },
    //     { senderId: receiverId, receiverId: senderId }
    //   ]
    });

    const newMessage = {
      senderId,
      message,
      receiverId
    };

    if (chat) {
      // Add message to existing chat
      chat.messages.push(newMessage);
      await chat.save();
    } else {
      // Create new chat with first message
      chat = new Chat({
        productId,
        senderId,
        receiverId,
        messages: [newMessage],
      });
      await chat.save();
    }

    res.status(200).json({ success: true, chat });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

// Get chat history for a specific product between two users
exports.getChatByProduct = async (req, res) => {
  try {
    const { productId, userId1, userId2 } = req.query;

    const chat = await Chat.findOne({
      productId,
    //   $or: [
    //     { senderId: userId1, receiverId: userId2 },
    //     { senderId: userId2, receiverId: userId1 }
    //   ]
    }).populate("senderId receiverId messages.senderId", "username email");

    if (!chat) {
      return res.status(404).json({ success: false, message: "No chat found" });
    }

    res.status(200).json({ success: true, chat });
  } catch (err) {
    console.error("Error getting chat:", err);
    res.status(500).json({ success: false, message: "Failed to get chat" });
  }
};

// Get all chats for a logged-in user (optional)
exports.getAllChatsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate("productId", "name")
      .populate("senderId receiverId", "username email");

    res.status(200).json({ success: true, chats });
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({ success: false, message: "Failed to fetch chats" });
  }
};
