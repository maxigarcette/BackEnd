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

    /*async getCartById(id){
        let cart = await this.getCarts()

        let indice = productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            console.log("not found")
            return
        }
        return cart[indice]
    }*/

}