# 匿名聊天室 | [Demo](https://f2e-chat-web.herokuapp.com/)

## 專案畫面

![匿名聊天室畫面](https://i.imgur.com/hI9JviJ.png)

## 專案描述

匿名聊天室 Side Project，包含**前端（使用 React 框架）**與**後端（使用 Express 框架）資料庫（使用 MongoDB 資料庫）**，並架設在 Heroku，採用行動裝置方向的設計來開發，提供**註冊**、**登入**與**匿名即時聊天功能**。

## 資料夾說明

```
|- /src
    |- /api：存放 API 串接整合資料
    |- /asset：共用圖資
    |- /components：共用元件
    |- /pages：頁面
    |- /redux：Redux 工具
    |- /utils：通用工具 Hook、設置常數
```

## 使用技術

### 前端框架

- React 版本 `v17.0.2`
- React-router-dom 版本 `v5.2.1`
- Redux 版本 `v3.7.2`
- React-Bootstrap UI
- socket.io-client

### 後端框架

- node.js 版本 `v16.4.2`
- express
- mongodb
- mongoose
- socket.io

### API 串接

- axios
- async & await

### 其他

- js-cookie
- prop-types
- rc-queue-anim
- NPM 版本 `v7.19.1`
