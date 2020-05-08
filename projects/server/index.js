const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
let connectedCounter = 0;
const ctxs = [];
let conns = {};

server.listen(3000,()=>{
  console.log('server is starting at port 3000');
});

// socket连接
io.on('connection', (socket) => {
  console.log('connected')

  socket.on('news', function (data) {
    console.log(data);
    io.emit('my other event', {hello: data.my});
  });
});

router.all('/', async function (ctx) {
  ctx.body = '请求成功了'
});

// Regular middleware
/*app.ws.use(function(ctx, next) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  conns = ({
    id: [connectedCounter],
    ctx: ctx
  });
  const msg = {
    type: 'enter',
    data: conns.id + 'comes in'
  };
  connectedCounter++;
  broadCast(JSON.stringify(msg));
  ctxs.push(ctx);
  return next(ctx);
});

// Using routes
app.ws.use(route.all('/test/:id', function (ctx) {
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.on('message', function(message) {
    // do something with the message from client
    const msg = {
      type: 'message',
      data: message.toUpperCase() + "!!!"
    };
    broadCast(JSON.stringify(msg));
  });
}));

function broadCast(str) {
  ctxs.forEach(ctx => {
    ctx.websocket.send(`${conns.id} says: ${str}`);
  })
}*/
app.use(router.routes()) .use(router.allowedMethods());

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:4102');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', 'true');

  if (ctx.method === 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
