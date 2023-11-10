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

            let resultado=carts.find(cart=>cart.cid===cid).productos

            let pid=req.params.pid
            pid=parseInt(pid)  
            if(isNaN(pid)){
                return res.send('Error, ingrese un argumento pid numerico')
            }
            
            let productoASumar = resultado.find(product=>product.pid===pid)

            if (!productoASumar) {
                
                let quantity = 1
                cm.addProductToCart(cid, pid, quantity)

                let nuevoProducto = {
                    pid:pid,
                    quantity:quantity
                }

                res.setHeader('Content-Type', 'application/json');
                return res.status(201).json({nuevoProducto});
            }
            cm.addExistingProductToCart(cid, productoASumar.pid, productoASumar.quantity)
        })

    } catch (error){
        console.log(error.message)
    }
}

entorno()