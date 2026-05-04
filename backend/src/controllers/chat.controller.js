const Message = require("../models/Message.model");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.userId, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.userId }
      ]
    })
    .populate("sender", "username avatar")
    .populate("receiver", "username avatar")
    .sort({ createdAt: 1 });

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const message = await Message.create({
      sender: req.userId,
      receiver: req.params.userId,
      text
    });
    await message.populate("sender", "username avatar");
    await message.populate("receiver", "username avatar");

    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};