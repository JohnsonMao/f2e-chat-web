# 匿名聊天室 | [Demo](https://f2e-chat-web.herokuapp.com/)

## 專案畫面

![匿名聊天室畫面](https://i.imgur.com/OCPcW2F.png)

## 專案描述

匿名聊天室 Side Project，包含

- 前端（使用 React 框架）
- 後端（使用 Express 框架）
- 資料庫（使用 MongoDB 資料庫）
- 架設在 Heroku

設計採用行動裝置方向來開發，並提供以下功能

- 註冊登入
- 根據 cookie 自動登入
- 根據用戶類型，顯示不同清單
- 匿名即時聊天
- 顯示未讀訊息數量
- 修改個人資料

## 體驗帳號密碼

**請勿在裡面留下任何敏感訊息！感謝！**

```
用戶名：毛毛
帳號：mao
密碼：mao

用戶名：我來測試
帳號：a123
密碼：a123

用戶名：我的暱稱
帳號：zxcv123
密碼：zxcv123
```

## 資料夾說明

```
使用 Express 的 MVC 架構

|- /client：前端 views，使用 React 框架，實作 SPA 頁面
    |- /src
        |- /api：存放 API 串接整合資料
        |- /asset：共用圖資
        |- /components：共用元件
        |- /pages：頁面
        |- /redux：Redux 工具
        |- /utils：通用工具 Hook、設置常數
|- /db：資料庫 model，使用 MongoDB
|- /routes：後端 controller
|- /socketIO：監聽 socket 工具
```

## 使用技術

### 前端框架

- React 版本 `v17.0.2`
- React-router-dom 版本 `v5.2.1`
- Redux 版本 `v3.7.2`
- React-BootStrap UI
- Socket.io-client

### 後端框架

- Node.js 版本 `v16.4.2`
- Express
- MongoDB
- Mongoose
- Socket.io

### API 串接

- axios
- async & await 語法

### 其他

- js-cookie
- prop-types
- rc-queue-anim
- NPM 版本 `v7.19.1`

## 後端 API

- POST /api/register - 註冊 API
- POST /api/login - 登入 API
- POST /api/update - 更新使用者資料 API
- GET /api/user - 根據 cookie 獲取使用者資料 API
- GET /api/userlist - 獲取伴侶清單 API
- GET /api/msglist - 獲取訊息清單 API
- POST /api/readMsg - 已讀功能 API
