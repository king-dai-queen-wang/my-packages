const router = require('koa-router')();
const {apiRouter} = require('./api');
const {gridRouter} = require('./grid');
import {main} from './aaa';

router.get('/api', apiRouter);
router.get('/grid', gridRouter);
router.get('/main', main);

router.get('/', async (ctx: any, next: any) => {
  ctx.body = '请求成功了';
  console.log(ctx);
  await next();
});
export default router;
