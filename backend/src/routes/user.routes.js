const router = require("express").Router();
const { getProfile, followUser, searchUsers } = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/search",       auth, searchUsers);
router.get("/:id",          auth, getProfile);
router.put("/:id/follow",   auth, followUser);

module.exports = router;