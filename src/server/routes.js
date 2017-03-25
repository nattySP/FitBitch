import Router from 'koa-router';
import UserManagementRouter from './api/UserManagement/routes'

function routeConfig(app){
    const mainRouter = new Router();
    app.use(mainRouter.routes());
    app.use(UserManagementRouter.routes());

    mainRouter.get('/:name', async (ctx)=>{
        ctx.body = `Hello ${ctx.params.name}`
    });
}

module.exports = routeConfig;