const User = require("../models/User.model");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "username avatar")
      .populate("following", "username avatar");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.followUser = async (req, res) => {
  try {
    if (req.params.id === req.userId)
      return res.status(400).json({ message: "No puedes seguirte a ti mismo" });

    const userToFollow = await User.findById(req.params.id);
    const currentUser  = await User.findById(req.userId);

    if (!userToFollow) return res.status(404).json({ message: "Usuario no encontrado" });

    const isFollowing = currentUser.following.includes(req.params.id);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.id);
      userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== req.userId);
    } else {
      currentUser.following.push(req.params.id);
      userToFollow.followers.push(req.userId);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ following: !isFollowing });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const users = await User.find({
      username: { $regex: q, $options: "i" }
    }).select("username avatar bio").limit(10);
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};