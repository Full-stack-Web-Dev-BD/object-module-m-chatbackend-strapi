import React, { useContext, useEffect, useState } from "react";
import { socket } from "../../../../web-sockets";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { MyContext } from "../../../../store/ContextProvider";

moment(new Date());

// UI
const MessageList = () => {
  const { state, allAction } = useContext(MyContext);

  const [myID, setMyID] = useState();
  const [allMessage, setAllMessage] = useState([]);
  const [currentConversationID, setCurrentConversationID] = useState();
  useEffect(() => {
    if (localStorage.getItem("chatapptoken")) {
      let decoded = jwtDecode(window.localStorage.getItem("chatapptoken"));
      setMyID(decoded.id);
      socket.on("receivemessage", (data) => {
        saver(data.data);
      });
    }
  }, []);

  const saver = (obj) => {
    allAction.createmessage(obj);
  };
  return (
    <div id="chat-message-list">
      {state.activeMessages.length < 1 ? (
        <div
          style={{
            textAlign: "center",
            fontSize: "26px",
            color: "gray",
            fontFamily: "cursive",
            padding: "100px 0",
          }}
        >
          <h2>Send Text to start Conversation !!</h2>
        </div>
      ) : (
        ""
      )}
      {state.activeMessages.map((item, index) => {
        return (
          <div
            key={index}
            className={`message-row ${
              myID == item.senderid ? "you-message" : "other-message"
            } `}
          >
            <div className="message-content">
              {myID == item.senderid ? (
                ""
              ) : (
                <>
                  {state.activeConversation.img ? (
                    <img
                      src={`/images/profiles/${user.img}`}
                      alt="logo"
                      id="logo"
                    />
                  ) : (
                    <div className="imagealt">
                      <span>
                        {state.activeConversation.username
                          ? state.activeConversation.username.charAt(0)
                          : "A"}
                      </span>
                    </div>
                  )}
                </>
              )}
              <div className="message-text ">{item.body}</div>
              <div className="message-time">{moment().format("lll")}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
