import __dirname from "./utils.js";
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';

import { router as productRouter } from './routes/products.router.js';
import { router as cartsRouter } from './routes/carts.router.js';
import { router as indexRouter } from './routes/index.router.js';

const PORT=8080;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));

app.use('/api/realtimeproducts', productRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)
app.use('/', indexRouter)

const entorno = async()=>{

    try {

        const server=app.listen(PORT,()=>{
            console.log(`Server escuchando en puerto ${PORT}`);
        });
        
    } catch (error){
        console.log(error.message)
    } 
}

entorno()