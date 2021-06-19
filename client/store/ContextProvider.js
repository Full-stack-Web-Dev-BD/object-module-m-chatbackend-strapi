import React, { createContext, useReducer } from "react";
const MyContext = createContext();

const actions = {
  SET_USER: "SER_USER",
  CREATEMESSAGE: "CREATEMESSAGE",
  SETACTIVECONVERSATION: "SETACTIVECONVERSATION",
  SET_ALL_MESSAGE: "SET_ALL_MESSAGE",
  SET_ACTIVE_MESSAGES: "SET_ACTIVE_MESSAGES",
  SET_USERS: "SET_USERS",
  SET_SOCKET_USERS: "SET_SOCKET_USERS",
};

// action
const stateAction = (dispatch) => ({
  setSocketUsers: (value) =>
    dispatch({ type: actions.SET_SOCKET_USERS, payload: value }),
  setUser: (value) => dispatch({ type: actions.SET_USER, payload: value }),
  createmessage: (value) =>
    dispatch({ type: actions.CREATEMESSAGE, payload: value }),
  setactiveconversation: (value) =>
    dispatch({ type: actions.SETACTIVECONVERSATION, payload: value }),
  setallmessage: (value) =>
    dispatch({ type: actions.SET_ALL_MESSAGE, payload: value }),
  setActiveMessages: (value) =>
    dispatch({ type: actions.SET_ACTIVE_MESSAGES, payload: value }),
  setUsers: (value) => dispatch({ type: actions.SET_USERS, payload: value }),
});

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SOCKET_USERS:
      return { ...state, socketUsers: action.payload };
    case actions.SET_USER:
      return { ...state, user: action.payload };
    case actions.CREATEMESSAGE:
      if (state.user.id == action.payload.senderid) {
        return {
          ...state,
          activeMessages: [action.payload, ...state.activeMessages],
          allMessage: [action.payload, ...state.allMessage],
        };
      } else if (state.activeConversation.id == action.payload.senderid) {
        return {
          ...state,
          activeMessages: [action.payload, ...state.activeMessages],
          allMessage: [action.payload, ...state.allMessage],
        };
      } else {
        return {
          ...state,
          allMessage: [action.payload, ...state.allMessage],
        };
      }
    case actions.SETACTIVECONVERSATION:
      return { ...state, activeConversation: action.payload };
    case actions.SET_ALL_MESSAGE:
      return { ...state, allMessage: action.payload };
    case actions.SET_ACTIVE_MESSAGES:
      return { ...state, activeMessages: action.payload };
    case actions.SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const Provider = (props) => {
  const [state, dispatchstate] = useReducer(reducer, {
    activeConversation: {},
    message: [],
    allMessage: [],
    activeMessages: [],
    user: {},
    users: [],
    socketUsers: [],
  });
  const allAction = stateAction(dispatchstate);
  return (
    <MyContext.Provider value={{ state, allAction }}>
      {props.children}
    </MyContext.Provider>
  );
};
export { Provider, MyContext };
