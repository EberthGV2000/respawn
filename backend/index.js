const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:4321", credentials: true }
});

app.use(cors({ origin: "http://localhost:4321", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",  require("./src/routes/auth.routes"));
app.use("/api/posts", require("./src/routes/post.routes"));
app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/chat",  require("./src/routes/chat.routes"));

require("./src/socket/socket")(io);

mongoose.connect(process.env.MONGO_URI)
  .then(() => httpServer.listen(process.env.PORT, () => 
    console.log(`✅ Server corriendo en puerto ${process.env.PORT}`)
  ))
  .catch(err => console.error("❌ Error:", err));