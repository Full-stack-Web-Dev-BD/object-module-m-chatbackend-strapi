import React, { useContext, useEffect, useState } from "react";
import { socket } from "../../../../web-sockets";
import jwtDecode from "jwt-decode";
import { MyContext } from "../../../../store/ContextProvider";

const ChatForm = () => {
  const { state, allAction } = useContext(MyContext);

  const [body, setBody] = useState("");
  const [myID, setMyID] = useState("");
  useEffect(() => {
    if (localStorage.getItem("chatapptoken")) {
      let decoded = jwtDecode(window.localStorage.getItem("chatapptoken"));
      setMyID(decoded.id);
    }
  }, []);

  // send message
  const sendMessage = () => {
    // save to  my   brower  what i send    partner
    let message = {
      body,
      senderid: myID,
      receipientid: state.activeConversation.id,
      conversationid:
        myID < state.activeConversation.id
          ? `${myID}-${state.activeConversation.id}`
          : `${state.activeConversation.id}-${myID}`,
      time: new Date(),
    };
    allAction.createmessage(message);
    socket.emit("sendMessage", { message });
    setBody("");
  };
  const enterKeyDown = (e) => {
    if (e.keyCode === 13 && body) {
      sendMessage();
    }
  };
  return (
    <div>
      <div id="chat-form">
        <div className="form">
          <div className="input-group mb-3">
            {/* <h3 onClick={(e) => allAction.createmessage({ body: "amain" })}>
              val {state.length}{" "}
            </h3> */}
            <input
              onChange={(e) => setBody(e.target.value)}
              value={body}
              type="text"
              onKeyDown={(e) => enterKeyDown(e)}
              className="form-control"
              placeholder="Type your  message here ."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                disabled={body ? false : true}
                onClick={(e) => sendMessage()}
                className="btn btn-outline-secondary"
                type="button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
