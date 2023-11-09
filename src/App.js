import express from 'express';
import { router as productRouter } from './routes/products.router.js';
import { router as cartsRouter } from './routes/carts.router.js';
const PORT=8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)

const entorno = async()=>{

    try {

        const server=app.listen(PORT,()=>{
            console.log(`Server escuchando en puerto ${PORT}`);
        });
        
        app.get('/',(req,res)=>{
            res.setHeader('Content-Type','text/plain');
            res.status(200).send('home');
        })
    } catch (error){
        console.log(error.message)
    } 
}

entorno()