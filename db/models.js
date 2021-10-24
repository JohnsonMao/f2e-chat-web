/* 
  Models.js
*/

/* 1. 連接資料庫 */
// 1.1 引入 mongoose
const mongoose = require('mongoose');
require('dotenv').config()

// 1.2 連接資料庫
mongoose.connect(
  String( process.env.DB_CONNECTION ),
  { useNewUrlParser: true },
  () => { console.log('connected to db') }
)
// 1.3 連接物件
const connection = mongoose.connection
// 1.4 綁定監聽
connection.on('connected', () => {
  console.log('mongoDB connect success!');
})



/* 2. 定義 User Model */
// 2.1 定義資料結構 Schema
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 帳號
  password: {type: String, required: true}, // 密碼
  userType: {type: String, required: true}, // 類型
  avater: {type: String, default: "dog-4"}, // 頭像
  name: {type: String},                     // 名字
  post: {type: String},                     // 職位
  info: {type: String},                     // 簡介
  company: {type: String},                  // 公司
  salary: {type: String},                   // 薪資
})
// 2.2 定義 Model
const UserModel = mongoose.model('user', userSchema);
// 2.3 匯出 Model
exports.UserModel = UserModel;

/* 3. 定義 Chat Model */
// 3.1 定義資料結構 Schema
const chatSchema = mongoose.Schema({
  from: {type: String, required: true},    // 發送用戶的 id
  to: {type: String, required: true},      // 接收用戶的 id
  chat_id: {type: String, required: true}, // from & to 組合的 String 判斷聊天室有誰
  content: {type: String, required: true}, // 內容
  read: {type: Boolean, default: false},   // 是否已讀
  create_time: {type: Number},             // 新增時間
})
// 3.2 定義 Model
const ChatModel = mongoose.model('chat', chatSchema);
// 3.3 匯出 Model
exports.ChatModel = ChatModel;