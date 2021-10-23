var express = require("express");
var router = express.Router();

const md5 = require("blueimp-md5");
const { UserModel, ChatModel } = require("../db/models");
const filter = { password: 0, __v: 0 }; // 指定過濾的資料

// 註冊路由
/* 
  1. path: /register
  2. post
  3. username & password 參數
  4. admin 是已經註冊的帳號
  5. 註冊成功: { status: 0, data: { id: 'abc', username: 'xxx', password: 'yyy' }}
  6. 註冊失敗: { status: 1, msg: '此帳號已被註冊' }
*/
router.post("/api/register", function (req, res) {
  const { username, password, userType } = req.body; // 讀取請求資料
  UserModel.findOne({ username }, (err, user) => {
    if (user) {
      res.send({ code: 1, msg: "此帳號已被註冊！" });
    } else {
      new UserModel({ username, userType, password: md5(password) }).save(
        (err, user) => {
          console.log(user);
          const data = { username, userType, _id: user._id }; // 另外包裝 Data 避免攜帶密碼
          res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
          res.send({ code: 0, data });
        }
      );
    }
  });
});

// 登入路由

router.post("/api/login", function (req, res) {
  const { username, password } = req.body;
  UserModel.findOne(
    { username, password: md5(password) },
    filter, // 過濾資料
    (err, user) => {
      if (user) {
        res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.send({ code: 0, data: user });
      } else {
        res.send({ code: 1, msg: "帳號或密碼不正確！" });
      }
    }
  );
});

// 更新使用者資料路由

router.post("/api/update", function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({ code: 1, msg: "請先登入！" });
  }
  const user = req.body;

  UserModel.findByIdAndUpdate({ _id: userid }, user, function (err, oldData) {
    if (!oldData) {
      // 查不到 id ，刪除 cookie
      res.clearCookie("userid");
      res.send({ code: 1, msg: "請先登入！" });
    } else {
      const { _id, username, userType } = oldData;
      const data = Object.assign({ _id, username, userType }, user);
      res.send({ code: 0, data });
    }
  });
});

// 透過 cookie 中的 userid 獲取使用者資料

router.get("/api/user", function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({ code: 1, msg: "請先登入！" });
  }
  UserModel.findOne({ _id: userid }, filter, function (err, user) {
    if (!user) {
      // 查不到 user ，刪除 cookie
      res.clearCookie("userid");
      res.send({ code: 1, msg: "請先登入！" });
    } else {
      res.send({ code: 0, data: user });
    }
  });
});

// 獲取用戶列表

router.get("/api/userlist", function (req, res) {
  const { type } = req.query;
  UserModel.find({ userType: type }, filter, function (err, users) {
    res.send({ code: 0, data: users });
  });
});

// 獲取聊天列表

router.get("/api/msglist", function (req, res) {
  // 獲取 userid
  const userid = req.cookies.userid;
  UserModel.find(function (err, userDocs) {
    // 使用 reduce 累加
    const users = userDocs.reduce((users, user) => {
      users[user._id] = {
        username: user.username,
        name: user.name,
        avater: user.avater,
      };
      return users;
    }, {});
    ChatModel.find(
      { $or: [{ from: userid }, { to: userid }] }, // 使用 $or（或） 查詢條件
      filter,
      function (err, chatMsgs) {
        res.send({ code: 0, data: { users, chatMsgs } });
      }
    );
  });
});

// 已讀功能

router.post("/api/readMsg", function (req, res) {
  const from = req.body.from;
  const to = req.cookies.userid;

  ChatModel.updateMany(
    { from, to, read: false },
    { read: true },
    function (err, doc) {
      console.log('/readMsg', doc);
      res.send({ code: 0, data: doc.modifiedCount }); // 更新數量
    }
  );
});

module.exports = router;
