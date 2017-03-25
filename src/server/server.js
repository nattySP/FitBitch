import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import config from 'config';
import routeConfig from './routes'
import db from './services/DatabaseService';

const app = new Koa();
app.use(bodyParser());
routeConfig(app);


db.connect()
    .then(()=>{
        app.listen(config.Server.port, ()=>{
            console.info(`FitBitch listening at http://localhost:${config.Server.port}`)
        });
    });
