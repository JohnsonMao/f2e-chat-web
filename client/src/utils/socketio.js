import io from 'socket.io-client';

// 連接 server
const socket = io('ws://localhost:4000');

socket.on('receiveMsg', function (data) {
  console.log('接收訊息', data);
})

socket.emit('sendMsg', {name: 'test'});