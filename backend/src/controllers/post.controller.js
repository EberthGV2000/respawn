const Post = require("../models/Post.model");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username avatar")
      .populate("comments.user", "username avatar")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = await Post.create({ user: req.userId, content, image });
    await post.populate("user", "username avatar");
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    const liked = post.likes.includes(req.userId);
    if (liked) {
      post.likes = post.likes.filter(id => id.toString() !== req.userId);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();
    res.json({ likes: post.likes.length, liked: !liked });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    post.comments.push({ user: req.userId, text });
    await post.save();
    await post.populate("comments.user", "username avatar");

    res.status(201).json({ comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    if (post.user.toString() !== req.userId)
      return res.status(403).json({ message: "No autorizado" });

    await post.deleteOne();
    res.json({ message: "Post eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};