import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
const io = new Server(http);

const app = express();
const port = 3000;

// app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Message = mongoose.model("Message", {
  name: String,
  message: String,
});

var dbUrl = "mongodb://username:password@ds257981.mlab.com:57981/simple-chat";

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

io.on("connection", () => {
  console.log("a user is connected");
});

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
  console.log("mongodb connected", err);
});

var server = app.listen(3001, () => {
  console.log("server is running on port", server.address().port);
});
//https://www.freecodecamp.org/news/simple-chat-application-in-node-js-using-express-mongoose-and-socket-io-ee62d94f5804/
