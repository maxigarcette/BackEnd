import { existsSync, promises } from 'fs'

export default class CartsManager{
    
    constructor(rutaArchivo){
        this.path=rutaArchivo
    }

    async getCarts(){
        if(existsSync(this.path)){
            return JSON.parse(await promises.readFile(this.path,"utf-8"))
        } else {
            return []
        }
    }

    async addCart(productos){

        let carts = await this.getCarts()

        let cid=1
        if(carts.length>0){
            cid=carts[carts.length-1].cid + 1
        }

        let nuevoCart ={
            cid,
            productos,
        }

        carts.push(nuevoCart)

        await promises.writeFile(this.path, JSON.stringify(carts,null,5))
    }

    async updateCart(products){

        await promises.writeFile(this.path, JSON.stringify(products,null,5))
    }

    async addProductToCart(cid, pid, quantity){

        let carts = await this.getCarts()
        let indiceCart = carts.findIndex(cart => cart.cid === cid)
        let productos=carts.find(cart=>cart.cid===cid).productos

        let nuevoProducto ={
            pid:pid,
            quantity:quantity,
        }

        productos.push(nuevoProducto)

        carts[indiceCart].productos = productos

        await promises.writeFile(this.path, JSON.stringify(carts,null,5))
    }

    async addExistingProductToCart(cid, pid, quantity){

        let carts = await this.getCarts()
        let indiceCart = carts.findIndex(cart => cart.cid === cid)
        let productos=carts.find(cart=>cart.cid===cid).productos
        let indiceProducto = productos.findIndex(producto => producto.pid === pid)

        let nuevoProducto ={
            pid:pid,
            quantity:quantity+1
        }

        productos[indiceProducto]=nuevoProducto

        carts[indiceCart].productos = productos

        await promises.writeFile(this.path, JSON.stringify(carts,null,5))
    }
}