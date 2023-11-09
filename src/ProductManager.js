import { existsSync, promises } from 'fs'

export default class ProductManager{
    
    static #precioBaseGanancia=0.15

    constructor(rutaArchivo){
        this.path=rutaArchivo
    }

    async getProducts(){
        if(existsSync(this.path)){
            return JSON.parse(await promises.readFile(this.path,"utf-8"))
        } else {
            return []
        }
    }

    async addProducts(producto, descripcion, img, precio, codigo, stock, status=true, categoria){

        let productos = await this.getProducts()

        let id=1
        if(productos.length>0){
            id=productos[productos.length-1].id + 1
        }

        let existe = productos.findIndex(producto=>producto.codigo===codigo)
        if(existe!==-1){
            console.log("code already exists")
            return
        }

        let nuevoProducto ={
            id,
            producto, descripcion,
            precio: precio + precio*ProductManager.#precioBaseGanancia,
            img, codigo, stock, status, categoria
        }

        productos.push(nuevoProducto)

        await promises.writeFile(this.path, JSON.stringify(productos,null,5))
    }

    async updateProduct(products){

        await promises.writeFile(this.path, JSON.stringify(products,null,5))

    }
}