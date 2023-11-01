const ProductManager = require("./ProductManager")
const express=require('express');

const PORT=3000;

const app=express();

const pm = new ProductManager("./src/archivos/productos.json")


const entorno = async()=>{

    try {

        let products = await pm.getProducts()

        const server=app.listen(PORT,()=>{
            console.log(`Server escuchando en puerto ${PORT}`);
        });
        
        app.get('/',(req,res)=>{
            res.setHeader('Content-Type','text/plain');
            res.status(200).send('home');
        })
        
        app.get('/products',(req,res)=>{
        
            let resultado = products
        
            if(req.query.limit){
                resultado=resultado.slice(0, req.query.limit)
            }
        
            res.setHeader('Content-Type','application/json');
            res.status(200).json(resultado);
        })

        app.get('/products/:id',(req,res)=>{

            let id=req.params.id

            id=parseInt(id)  
            if(isNaN(id)){
                return res.send('Error, ingrese un argumento id numerico')
            }
        
        
            resultado=products.find(per=>per.id===id)
        
            res.setHeader('Content-Type','application/json');
            res.status(200).json(resultado);
        })

    } catch (error){
        console.log(error.message)
    } 
}

entorno()