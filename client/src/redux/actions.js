import io from "socket.io-client";
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg,
} from "../api";
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

function initSocketIO (dispatch, userid) {
  if (!io.socket) {
    io.socket = io(`ws://localhost/`);

    // 接收訊息
    io.socket.on("receiveMsg", function (chatMsg) {
      console.log("接收訊息", chatMsg);
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch (receiveMsg(chatMsg, userid ))
      }
    });
  }
}

// 獲取訊息列表
async function getMsgList (dispatch, userid) {
  initSocketIO(dispatch, userid);   // 初始化 socket
  const response = await reqChatMsgList();
  const result = response.data;
  if (result.code === 0) {
    const { users, chatMsgs } = result.data;
    dispatch( receiveMsgList({users, chatMsgs, userid}));
  }
}

// 發送訊息的非同步 action
export const sendMsg = ({ from, to, content }) => {
  return (dispatch) => {
    console.log("發送訊息", { from, to, content });
    io.socket.emit("sendMsg", { from, to, content });
  };
};

// 已讀訊息非同步 action
export const readMsg = (targetId, meId) => {
  return async (dispatch) => {
    const response = await reqReadMsg(targetId);
    const result = response.data;
    if (result.code === 0) {
      const count = result.data;
      dispatch( msgRead({count, targetId, meId}));
    }
  }
}

// 授權成功同步 action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
// 錯誤訊息同步 action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
// 接收使用者同步 action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
// 重置使用者同步 action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });
// 接收使用者列表同步 action
const receiveUserList = (userList) => ({
  type: RECEIVE_USER_LIST,
  data: userList,
});
// 接收訊息列表的同步 action
const receiveMsgList = ({ users, chatMsgs, userid }) => ({
  type: RECEIVE_MSG_LIST,
  data: { users, chatMsgs, userid }
});
// 接收一個訊息的同步 action
const receiveMsg = (chatMsg, userid) => ({ type: RECEIVE_MSG, data: { chatMsg, userid }})
// 已讀訊息同步 action
const msgRead = ({count, targetId, meId}) => ({ type: MSG_READ, data: {count, targetId, meId}})


// 註冊非同步 action
export const register = (user) => {
  const { username, password, checkPassword, userType } = user;
  // 前端驗證
  if (!username.trim()) {
    return errorMsg("請輸入帳號！");
  } else if (password !== checkPassword) {
    return errorMsg("確認密碼要一致！");
  }

  return async (dispatch) => {
    const response = await reqRegister({ username, password, userType });
    const result = response.data; // { code: 0/1, data: user, msg: ''};
    if (result.code === 0) {
      // 成功
      getMsgList(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    } else {
      // 失敗
      dispatch(errorMsg(result.msg));
    }
  };
};

// 登入非同步 action
export const login = (user) => {
  const { username, password } = user;
  // 前端驗證
  if (!username.trim()) {
    return errorMsg("請輸入帳號！");
  } else if (!password.trim()) {
    return errorMsg("請輸入密碼！");
  }
  return async (dispatch) => {
    const response = await reqLogin(user);
    const result = response.data;
    if (result.code === 0) {
      // 成功
      getMsgList(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    } else {
      // 失敗
      dispatch(errorMsg(result.msg));
    }
  };
};

// 更新使用者資料非同步 action
export const updateUser = (user) => {
  return async (dispatch) => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

// 獲取使用者資料非同步 action
export const getUser = () => {
  return async (dispatch) => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

// 獲取使用者列表非同步 action
export const getUserList = (type) => {
  return async (dispatch) => {
    const response = await reqUserList(type);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  };
};
