"use strict";
const mongoose = require("mongoose");
module.exports = () => {
  const localURI = "mongodb://localhost/mongotest";
  const remoteURI =
    "mongodb+srv://admin:PeCcM2YVDxjxBiWA@cluster0.zgay3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  mongoose
    .connect(
      "mongodb+srv://admin:PeCcM2YVDxjxBiWA@cluster0.zgay3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    )
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
      require: new Date(),
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
  // connect socket socket
  io.on("connection", function (socket) {
    socket.on("join", async ({ ID }, callback) => {
      socketUserModel.find({ userid: ID }).then((users) => {
        if (users.length > 0) {
          users[0].socketid = socket.id;
          users[0]
            .save()
            .then((resp) => {
              console.log("user updated with new socket ID ");
              messageModel.find().then((allmessage) => {
                socket.emit("connected", {
                  user: "bot",
                  messages: allmessage,
                });
              });
            })
            .catch((err) => {
              console.log("error");
            });
        } else {
          new socketUserModel({
            userid: ID,
            socketid: socket.id,
          })
            .save()
            .then((resp) => {
              console.log("created new socket user ");
              messageModel.find().then((allMessage) => {
                socket.emit("connected", {
                  user: "bot",
                  messages: allMessage,
                });
              });
            })
            .catch((err) => {
              console.log("error");
            });
        }
      });
    });
    // Receive  Message
    socket.on("sendMessage", async (data, callback) => {
      console.log(data);
      try {
        const { body, senderid, receipientid, conversationid, time } =
          data.message;
        // Save the message  in database
        new messageModel({
          body,
          senderid,
          receipientid,
          conversationid,
        })
          .save()
          .then((savedMessage) => {
            console.log("message saved");
          })
          .catch((err) => {
            console.log("error while  message saving");
          });
        socketUserModel.findOne({ userid: receipientid }, (err, activeUser) => {
          if (err) {
            console.log(err);
          } else {
            if (activeUser) {
              socket.broadcast
                .to(activeUser.socketid)
                .emit("receivemessage", { data: data.message });
              console.log("sms emited success");
            } else {
              console.log("user is off line", activeUser);
            }
          }
        });
      } catch (err) {
        console.log("err inside catch block");
      }
    });
    // while  user  disconnected
    socket.on("disconnect", async (data) => {
      try {
        console.log("DISCONNECTED!!!!!!!!!!!!", socket.id);
        socketUserModel.findOneAndDelete(
          { socketid: socket.id },
          {},
          (err, doc) => {
            if (err) {
              console.log("mongo err");
            } else {
              console.log("deleted user ");
            }
          }
        );
      } catch (err) {
        console.log("error while disconnecting");
      }
    });
  });
};
