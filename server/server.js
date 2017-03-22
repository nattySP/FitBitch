import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from 'config';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/:name', async (ctx)=>{
    ctx.body = `Hello ${ctx.params.name}`
});

app.use(router.routes());

app.listen(config.Server.port, ()=>{
    console.info(`FitBitch listening at http://localhost:${config.Server.port}`)
});