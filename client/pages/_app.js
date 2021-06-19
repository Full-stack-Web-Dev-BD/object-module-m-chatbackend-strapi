import Head from "next/head";

// scss
import "../styles/globals.scss";
import "./chatpage/chatshell/ChatShell.scss";
import "./chatpage/chatshell/ConversationSearch/ConversationSearch.scss";
import "./chatpage/chatshell/ConversationList/ConversationList.scss";
import "./chatpage/chatshell/ConversationList/ConversationItem/ConversationItem.scss";
import "./chatpage/chatshell/NewConversation/NewConversation.scss";
import "./chatpage/chatshell/ChatTitle/ChatTitle.scss";
import "./chatpage/chatshell/MessageList/MessageList.scss";
import "./chatpage/chatshell/MessageList/Message/Message.scss";
import "./chatpage/chatshell/ChatForm/ChatForm.scss";
import "../pages/chatpage/chatshell/responsive.scss";

import { Provider } from "../store/ContextProvider";

// UI

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>1stkare App ( Chat Phase ) </title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />

        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
export default MyApp;
