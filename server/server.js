import 'babel-polyfill'

import Koa from 'koa';
import send from 'koa-send';
import bodyParser from 'koa-bodyparser';
import config from 'config';
import routeConfig from './routes'
import db from './services/DatabaseService';
import path from 'path';
import serve from 'koa-static';


const PROD = process.env.NODE_ENV === 'production';
const baseDir = PROD ? 'build' : 'dist';

const app = new Koa();
app.use(bodyParser());
routeConfig(app);


//app.use(compression());

app.use(serve(path.join(__dirname + '/../client')));

db.connect()
    .then(()=>{
        app.listen(config.Server.port, ()=>{
            console.info(`FitBitch listening at http://localhost:${config.Server.port}`)
        });
    });

