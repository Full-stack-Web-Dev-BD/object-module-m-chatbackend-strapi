import React, { useContext, useEffect, useState } from "react";
import ConversationSearch from "./ConversationSearch/ConversationSearch";
import ConversationList from "./ConversationList/ConversationList";
import NewConversation from "./NewConversation/NewConversation";
import ChatTitle from "./ChatTitle/ChatTitle";
import MessageList from "./MessageList/MessageList";
import ChatForm from "./ChatForm/ChatForm";
import Head from "next/head";
import jwtDecode from "jwt-decode";
import { socket } from "../../../web-sockets";
import axios from "axios";
import { MyContext } from "../../../store/ContextProvider";
import { remoteProxyURL } from "../../../config";

// UI
const ChatShell = () => {
  const [user, setUser] = useState({});
  const { state, allAction } = useContext(MyContext);

  useEffect(() => {
    let decoded;
    if (window.localStorage.getItem("chatapptoken")) {
      decoded = jwtDecode(window.localStorage.getItem("chatapptoken"));
    }

    // If  User existing
    if (decoded.id) {
      socket.emit("join", { ID: decoded.id }, (error) => {
        if (error) {
          console.log("error");
        } else {
          socket.on("connected", (data) => {
            console.log("you are connected !!");
            console.log("chat history ", data);
          });
        }
      });

      // Socket IO
      socket.on("connected", (data) => {
        allAction.setallmessage(data.messages.reverse());
        axios
          .get(`${remoteProxyURL}/users`)
          .then((resp) => {
            console.log("all users", resp);
            allAction.setUsers(resp.data);
            conversationSetter(resp.data[0], data.messages, decoded.id);
          })
          .catch((err) => {
            console.log(err.response);
          });
      });

      // htttp
      axios
        .get(`${remoteProxyURL}/users/${decoded.id}`)
        .then((resp) => {
          setUser(resp.data);
          allAction.setUser(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const conversationSetter = (userinfo, messages, myID) => {
    allAction.setactiveconversation(userinfo);
    let id1 = myID;
    let id2 = userinfo.id;
    let activeConversationID = id1 < id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
    // filter message for  selected user
    let activeConversation = messages.filter(
      (singleMessage) => singleMessage.conversationid === activeConversationID
    );
    allAction.setActiveMessages(activeConversation);
  };
  return (
    <div id="chat-container">
      <Head>
        <title>Chat Page</title>
      </Head>
      <ConversationSearch />
      <ConversationList />
      <NewConversation />
      <ChatTitle />
      <MessageList />
      <ChatForm />
    </div>
  );
};
export default ChatShell;
