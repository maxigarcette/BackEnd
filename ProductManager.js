
class ProductManager{
    
    static #precioBaseGanancia=0.15

    constructor(){
        this.productos=[]
    }

    getProducts(){
        return this.productos
    }

    addProducts(producto, descripcion, img, precio, codigo, stock){

        let id=1
        if(this.productos.length>0){
            id=this.productos[this.productos.length-1].id + 1
        }

        let indice = this.productos.findIndex(producto=>producto.codigo===codigo)
        if(indice===-1){
            let nuevoProducto ={
                id,
                producto, descripcion,
                precio: precio + precio*ProductManager.#precioBaseGanancia,
                img, codigo, stock
            }
    
            this.productos.push(nuevoProducto)
        } else {
            console.log("code already exists")
            return
        }
    }

    getProductById(id){
        let indice = this.productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            console.log("not found")
            return
        }
        return this.productos[indice]
    }
}
