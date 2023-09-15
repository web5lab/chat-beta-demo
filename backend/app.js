require("dotenv").config();
const express = require("express");
const Port = 3999;
const bodyParser = require("body-parser");
const databaseConnection = require("./mongoDb/db");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const { socketIoConnection } = require("./socket/socket");
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const router = express.Router();
app.set("socketIo", io);
app.use(
  cors({
    origin: "*",
  })
);

// routes import here
const chatRoute = require("./routes/chatRoutes");
const authRoute = require("./routes/userRoutes");

app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes using here
app.use("/auth", authRoute);
app.use("/chat", chatRoute);

databaseConnection(() => {
  server.listen(Port, () => {
    socketIoConnection(io);
    console.log(`server started at ${Port}`);
  });
});