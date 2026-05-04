const router = require("express").Router();
const { getMessages, sendMessage } = require("../controllers/chat.controller");
const auth = require("../middleware/auth.middleware");

router.get("/:userId",      auth, getMessages);
router.post("/:userId",     auth, sendMessage);

module.exports = router;