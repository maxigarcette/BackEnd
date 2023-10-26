const fs = require('fs')

class ProductManager{
    
    static #precioBaseGanancia=0.15

    constructor(rutaArchivo){
        this.path=rutaArchivo
    }

    async getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
        } else {
            return []
        }
    }

    async addProducts(producto, descripcion, img, precio, codigo, stock){

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
            img, codigo, stock
        }

        productos.push(nuevoProducto)

        await fs.promises.writeFile(this.path, JSON.stringify(productos,null,5))
    }

    async getProductById(id){
        let productos = await this.getProducts()

        let indice = productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            console.log("not found")
            return
        }
        return productos[indice]
    }

    async updateProduct(id,precio,stock){
        let productos = await this.getProducts()

        let indice = productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            console.log("not found")
            return
        }

        productos[indice].precio=precio
        productos[indice].stock=stock

        await fs.promises.writeFile(this.path, JSON.stringify(productos,null,5))

    }

    async deleteProduct(id){
        let productos = await this.getProducts()

        let indice = productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            console.log("not found")
            return
        }

        productos.pop(id)

        await fs.promises.writeFile(this.path, JSON.stringify(productos,null,5))
    }
}

module.exports=ProductManager 