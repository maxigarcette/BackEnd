import __dirname from "./utils.js";
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io'

import { router as productRouter } from './routes/products.router.js';
import { router as cartsRouter } from './routes/carts.router.js';
import { router as indexRouter } from './routes/index.router.js';
import { router as realTimeRouter } from './routes/real.time.router.js';

const PORT=8080;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));

app.use('/realtimeproducts', realTimeRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)
app.use('/', indexRouter)

const entorno = async()=>{

    try {

        const serverHTTP=app.listen(PORT,()=>{
            console.log(`Server escuchando en puerto ${PORT}`);
        });

        const serverSockets = new Server(serverHTTP)

        serverSockets.on("conection", socket=>{
            console.log('se conecto un cliente con id', socket.id)
        })
        
    } catch (error){
        console.log(error.message)
    } 
}

entorno()