"use strict";
const mongoose = require("mongoose");
module.exports = () => {
  const localURI = "mongodb://localhost/objectdatabase";
  const remoteURI =
    "mongodb+srv://admin:PeCcM2YVDxjxBiWA@cluster0.zgay3.mongodb.net/objectdatabase?retryWrites=true&w=majority";
  mongoose
    .connect(localURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((connectstatus) => {
      console.log("Mongodb  connected");
    })
    .catch((err) => {
      console.log(err);
    });
  const Schema = mongoose.Schema;
  const socketusersSchema = new Schema({
    userid: {
      type: String,
      require: true,
    },
    socketid: {
      type: String,
      require: true,
    },
  });

  const messageSchema = new Schema({
    body: {
      type: String,
      require: true,
    },
    senderid: {
      type: String,
      require: true,
    },
    receipientid: {
      type: String,
      require: true,
    },
    conversationid: {
      type: String,
      require: true,
    },
    time: {
      type: Date,
      default: new Date(),
    },
  });
  const socketUserModel = mongoose.model("socketUserModel", socketusersSchema);
  const messageModel = mongoose.model("messageModel", messageSchema);

  //  socket initialize
  var io = require("socket.io")(strapi.server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });
  io.on("connection", function (socket) {
    socket.on("join", async ({ ID }, callback) => {
      let existingSocketUser = await strapi.services.socket.find({
        userid: ID,
      });
      if (existingSocketUser.length > 0) {
        await strapi.services.socket.update(
          { userid: ID },
          { userid: ID, socketid: socket.id }
        );
        let allSocketUsers = await strapi.services.socket.find();
        let allmessage = await strapi.services.message.find();
        socket.emit("connected", {
          sockets: allSocketUsers,
          user: "bot",
          messages: allmessage,
        });
      } else {
        await strapi.services.socket.create({
          userid: ID,
          socketid: socket.id,
        });
        let allSocketUsers = await strapi.services.socket.find();
        let allmessage = await strapi.services.message.find();
        socket.emit("connected", {
          sockets: allSocketUsers,
          user: "bot",
          messages: allmessage,
        });
      }
    });
    // Receive  Message
    socket.on("sendMessage", async (data, callback) => {
      try {
        const { body, senderid, receipientid, conversationid } = data.message;
        console.log(data.message);
        let crMessage = await strapi.services.message.create({
          body,
          senderid,
          receipientid,
          conversationid,
        });

        let findToUser = await strapi.services.socket.findOne({
          userid: receipientid,
        });
        console.log("finded user", findToUser);
        if (findToUser) {
          socket.broadcast
            .to(findToUser.socketid)
            .emit("receivemessage", { data: data.message });
        } else {
          console.log("User is offline ");
        }
      } catch (err) {
        console.log("err inside catch block", err);
      }
    });
    // while  user  disconnected
    socket.on("disconnect", async (data) => {
      try {
        var deletedSocketUser = await strapi.services.socket.delete({
          socketid: socket.id,
        });
        if (deletedSocketUser) {
          console.log(" User Disconnected  and deleted ");
        } else {
          console.log(" Disconnected user not  able to delete  ");
        }
      } catch (err) {
        console.log("error while disconnecting");
      }
    });
  });
};
