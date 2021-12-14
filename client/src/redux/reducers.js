import { combineReducers } from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from "./action-types";

import getRedirectTo from "../utils/getRedirectTo";

const initUser = {
  username: "",
  type: "",
  msg: "",
  redirectTo: "", // 重新指定路由
};

// 產生 user 狀態的 reducer
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data: user
      const { userType, name } = action.data;
      return { ...action.data, redirectTo: getRedirectTo(name) };
    case ERROR_MSG: // data: msg
      return { ...state, msg: action.data };
    case RECEIVE_USER: // data: user
      return action.data;
    case RESET_USER: // data: msg，初始化狀態
      return { ...initUser, msg: action.data };
    default:
      return state;
  }
}

const initUserList = [];

// 產生 user list 狀態的 reducer
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0,
};

// 產生聊天狀態的 reducer

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST: // data: {users, chatMsgs, userid}
      const { users, chatMsgs, userid } = action.data;
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce(
          (preTotal, msg) =>
            preTotal + (!msg.read && msg.to === userid ? 1 : 0),
          0
        ),
      };
    case RECEIVE_MSG: // data: {chatMsgs, userid}
      const { chatMsg, userid: id } = action.data;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === id ? 1 : 0)
      };
    case MSG_READ:
      const { count, targetId, meId } = action.data;
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map( msg => {
          if (msg.from === targetId && msg.to === meId && !msg.read) {
            return {...msg, read: true};
          } else {
            return msg;
          }
        }),
        unReadCount: state.unReadCount - count
      };
    default:
      return state;
  }
}

export default combineReducers({
  user,
  userList,
  chat,
});
