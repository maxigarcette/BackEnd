import ProductManager from "../ProductManager.js";
import { Router } from 'express';
export const router=Router()

const pm = new ProductManager("./src/archivos/productos.json")

const entorno = async()=>{

    try {
        let products = await pm.getProducts()

        router.get('/', (req,res)=>{

            let resultado = products

            if(req.query.limit){
                resultado=resultado.slice(0, req.query.limit)
            }

            res.setHeader('Content-Type','application/json');
            res.status(200).json(resultado);
        })

        router.get('/:id',(req,res)=>{

            let id=req.params.id

            id=parseInt(id)  
            if(isNaN(id)){
                return res.send('Error, ingrese un argumento id numerico')
            }

            let indiceProducto = products.findIndex(producto => producto.id === id)
            if (indiceProducto === -1) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `No existe producto con id ${id}` })
            }

            let resultado=products.find(producto=>producto.id===id)

            res.setHeader('Content-Type','application/json');
            res.status(200).json(resultado);
        })

        router.post('/', (req, res) => {
            let { producto, descripcion, img, precio, codigo, stock, categoria } = req.body
            if (!producto || !descripcion || !img || !precio || !codigo || !stock || !categoria ) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `complete todos los campos` })
            }
        
            let existe = products.find(producto => producto.codigo === codigo)
            if (existe) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `El producto ${producto} con codigo ${codigo} ya existe en BD` })
            }

            pm.addProducts(producto, descripcion, img, precio, codigo, stock, categoria)
            let nuevoProducto = { producto, descripcion, img, precio, codigo, stock, categoria }
        
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ nuevoProducto });
        })

        router.put('/:id', (req, res) => {
            let { id } = req.params

            id = parseInt(id)
            if (isNaN(id)) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `Indique un id numérico` })
            }
        
            let indiceProducto = products.findIndex(producto => producto.id === id)
            if (indiceProducto === -1) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `No existe producto con id ${id}` })
            }
        
            let propiedadesPermitidas = ["descripcion", "img", "precio", "stock"]
            let propiedadesEntrantes = Object.keys(req.body)
            let valido = propiedadesEntrantes.every(propiedad => propiedadesPermitidas.includes(propiedad))
            if (!valido) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `No se aceptan algunas propiedades`, propiedadesPermitidas })
            }

            let productoModificado = {
                ...products[indiceProducto],  
                ...req.body,
                id
            }

            products[indiceProducto] = productoModificado

            pm.updateProduct(products)
        
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({productoModificado});
        });

        router.delete('/:id',(req,res)=>{
            let {id}=req.params

            id=parseInt(id)
            if(isNaN(id)){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Indique un id numérico`})
            }

            let indiceProducto=products.findIndex(producto=>producto.id===id)
            if(indiceProducto===-1){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe producto con id ${id}`})
            }

            let productoEliminado=products.splice(indiceProducto,1)

            pm.updateProduct(products)
            
            res.setHeader('Content-Type','application/json');
            res.status(200).json({productoEliminado});
        });

    } catch (error){
        console.log(error.message)
    } 
}

entorno()
