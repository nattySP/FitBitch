import Router from 'koa-router';
import Users from './Users'
const userManagementRouter = new Router({prefix: '/users'});

userManagementRouter.post(`/create`, async (ctx)=>{
    await Users.createUser(ctx.request.body);
    ctx.body = 'Created User!';
});

userManagementRouter.put('/:id', async (ctx)=>{
    await Users.updateUser(ctx.request.body);
    ctx.body = 'Updated User!';
});

module.exports = userManagementRouter;
