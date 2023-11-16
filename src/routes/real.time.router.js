import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js'
export const router=Router()

const pm = new ProductManager("./src/archivos/productos.json")

const entorno = async()=>{
    try {

        let products= await pm.getProducts()

        router.get('/',(req,res)=>{

            let resultado = products
        
            res.status(200).render('real-time-products', {
                resultado, titulo:'productos'
            })
        })

    } catch (error){
        console.log(error.message)
    } 
}

entorno()


