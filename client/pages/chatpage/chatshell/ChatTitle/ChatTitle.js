import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { MyContext } from "../../../../store/ContextProvider";
import { remoteProxyURL } from "../../../../config";

const ChatTitle = () => {
  const [user, setUser] = useState({});
  const { state, allAction } = useContext(MyContext);

  const logout = () => {
    window.localStorage.removeItem("chatapptoken");
    window.location.href = "/";
  };

  useEffect(() => {
    let decoded = jwtDecode(window.localStorage.getItem("chatapptoken"));
    if (decoded.id) {
      axios
        .get(`${remoteProxyURL}/users/${decoded.id}`)
        .then((resp) => {
          setUser(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  let chatTitleContents = null;

  if (true) {
    chatTitleContents = (
      <>
        <span> {state.activeConversation.username} </span>
        <div title="Delete Conversation">
          <span
            onClick={(e) => {
              logout();
            }}
            className="logout-icon"
          >
            <ExitToAppIcon />
          </span>
        </div>
      </>
    );
  }

  return <div id="chat-title">{chatTitleContents}</div>;
};

export default ChatTitle;
