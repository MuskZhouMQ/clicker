const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let clickCount = 0;
const bannedUsers = new Map();

io.on('connection', (socket) => {
  const socketId = socket.id;

  // 检查该用户是否已被封禁
  if (bannedUsers.has(socketId) && Date.now() < bannedUsers.get(socketId)) {
    socket.emit('banned'); // 向客户端发送封禁通知
    socket.disconnect(true);
    return;
  }

  let clickTimes = [];

  socket.on('buttonClicked', () => {
    const now = Date.now();
    clickTimes.push(now);

    // 移除超过1秒的点击记录
    clickTimes = clickTimes.filter(time => now - time <= 1000);

    if (clickTimes.length > 10) {
      bannedUsers.set(socketId, now + 5 * 60 * 1000); // 封禁用户5分钟
      socket.emit('banned'); // 向客户端发送封禁通知
      socket.disconnect(true);
    } else {
      clickCount++;
      io.emit('updateCount', clickCount); // 向所有客户端广播新的点击数
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
