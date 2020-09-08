import Socket = NodeJS.Socket;
import router from './routers';
// import * as socketio from 'socket.io';

const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server, {
  serveClient: false,
  wsEngine: 'ws'});

server.listen(3000, () => {
  console.log('server is starting at port 3000');
});

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx: any, next: any) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:4102');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', 'false');

  if (ctx.method === 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
// const io = openSocket(server);
let connectedCounter = 0;
const socketMap: any = {};
// socket连接
io.on('connection', (socket: Socket | any) => {
  console.log('connection');
  connectedCounter++;
  socket.clientNum = connectedCounter;
  socket.nickName = 'user' + connectedCounter;
  socketMap[socket.clientNum] = socket;
  if (socket.clientNum % 2 === 1) {
    socket.emit('waiting', 'wating for another person');
  } else {
    if (socketMap[socket.clientNum - 1]) {
      socket.emit('start');
      socketMap[socket.clientNum - 1].emit('start');
    } else {
      socket.emit('leave');
    }
  }
  io.emit('enter', socket.nickName + 'comes in');


  socket.on('disconnect', () => {
    if (socket.clientNum % 2 === 1) {
      // tslint:disable-next-line:no-unused-expression
      socketMap[socket.clientNum + 1] && socketMap[socket.clientNum + 1].emit('leave');
    } else {
      // tslint:disable-next-line:no-unused-expression
      socketMap[socket.clientNum - 1] && socketMap[socket.clientNum - 1].emit('leave');
    }
    delete (socketMap[socket.clientNum]);
  });

  bindSocketEventListener(socket, 'init');
  bindSocketEventListener(socket, 'performNext');
  bindSocketEventListener(socket, 'rotate');
  bindSocketEventListener(socket, 'left');
  bindSocketEventListener(socket, 'right');
  bindSocketEventListener(socket, 'fall');
  bindSocketEventListener(socket, 'fixed');
  bindSocketEventListener(socket, 'line');
  bindSocketEventListener(socket, 'down');
  bindSocketEventListener(socket, 'time');
  bindSocketEventListener(socket, 'lose');
  bindSocketEventListener(socket, 'bottomLines');
  bindSocketEventListener(socket, 'addTailLines');

});

function  bindSocketEventListener(socket: any, event: any) {
  socket.on(event, (data: any) => {
    if (socket.clientNum % 2 === 0) {
      // tslint:disable-next-line:no-unused-expression
      socketMap[socket.clientNum - 1] && socketMap[socket.clientNum - 1].emit(event, data);
    } else {
      // tslint:disable-next-line:no-unused-expression
      socketMap[socket.clientNum + 1] && socketMap[socket.clientNum + 1].emit(event, data);
    }
  });
}
