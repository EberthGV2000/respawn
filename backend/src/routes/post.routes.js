const router = require("express").Router();
const { getPosts, createPost, likePost, commentPost, deletePost } = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");

router.get("/",                auth, getPosts);
router.post("/",               auth, createPost);
router.put("/:id/like",        auth, likePost);
router.post("/:id/comment",    auth, commentPost);
router.delete("/:id",          auth, deletePost);

module.exports = router;