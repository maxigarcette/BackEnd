import CartsManager from "../CartsManager.js";
import ProductManager from "../ProductManager.js";
import { Router } from 'express';
export const router=Router()

const cm = new CartsManager("./src/archivos/carritos.json")
const pm = new ProductManager("./src/archivos/productos.json")

const entorno = async()=>{

    try {
        let carts = await cm.getCarts()

        router.post('/', (req, res) => {
            let { productos } = req.body
            if (!productos) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `no hay productos para cargar al carrito` })
            }

            cm.addCart(productos)
            let nuevoCart = { productos }
        
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ nuevoCart });
        })

        router.get('/:cid',(req,res)=>{

            let cid=req.params.cid

            cid=parseInt(cid)  
            if(isNaN(cid)){
                return res.send('Error, ingrese un argumento id numerico')
            }

            let indiceCart = carts.findIndex(cart => cart.cid === cid)
            if (indiceCart === -1) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `No existe cart con id ${cid}` })
            }

            let resultado=carts.find(cart=>cart.cid===cid)

            res.setHeader('Content-Type','application/json');
            res.status(200).json(resultado);
        })

       router.post('/:cid/products/:pid', (req, res) => {

            let cid=req.params.cid
            cid=parseInt(cid)  
            if(isNaN(cid)){
                return res.send('Error, ingrese un argumento cid numerico')
            }

            let indiceCart = carts.findIndex(cart => cart.cid === cid)
            if (indiceCart === -1) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `No existe cart con id ${cid}` })
            }

            let resultado=carts.find(cart=>cart.cid===cid)


            let pid=req.params.cid
            pid=parseInt(pid)  
            if(isNaN(pid)){
                return res.send('Error, ingrese un argumento pid numerico')
            }

            let indiceProducto = resultado.productos.findIndex(producto => producto.pid === pid)
            if (indiceProducto === -1) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `No existe producto con id ${pid}` })
            }

            producto = pm.getProductById(pid)

            let quantity = 1

            if (producto.id === resultado.productos[indiceProducto].pid) {   
                let nuevoProductoSumado ={
                    pid:producto.id,
                    quantity:quantity++,
                }

                resultado.productos[indiceProducto] = nuevoProductoSumado

                cm.updateProduct(resultado.productos)
        
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({nuevoProductoSumado});
            }

            cm.addProductToCart(producto.id, 1)

            let nuevoProducto = { producto }
        
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ nuevoProducto });

        })

    } catch (error){
        console.log(error.message)
    }
}

entorno()