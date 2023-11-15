import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js'
export const router=Router()

const pm = new ProductManager("./src/archivos/productos.json")

const entorno = async()=>{

    try {

        let products= await pm.getProducts()

        router.get('/',(req,res)=>{

            let resultado = products

            if(req.query.limit){
                resultado=resultado.slice(0, req.query.limit)
            }
        
            res.status(200).render('index', {
                resultado, titulo:'productos'
            })
        })

    } catch (error){
        console.log(error.message)
    } 
}

entorno()