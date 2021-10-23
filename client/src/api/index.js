/* API */
import ajax from './ajax';

/* 註冊 API */
export const reqRegister = (user) => ajax('/api/register', user, "POST");
/* 登入 API */
export const reqLogin = (user) => ajax('/api/login', user, "POST");
/* 更新資料 API */
export const reqUpdateUser = (user) => ajax('/api/update', user, "POST");
/* 獲取使用者資料 API */
export const reqUser = () => ajax('/api/user');
/* 獲取用戶列表 API */
export const reqUserList = (type) => ajax('/api/userlist', {type});
/* 獲取聊天列表 API */
export const reqChatMsgList = () => ajax('/api/msglist');
/* 已讀 API */
export const reqReadMsg = (from) => ajax('/api/readmsg', { from }, "POST");