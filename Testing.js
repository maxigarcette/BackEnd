const ProductManager = require("./ProductManager")

const pm = new ProductManager("./archivos/productos.json")

const entorno = async()=>{

    try {
        /*console.log(await pm.getProducts())
        await pm.addProducts("pelota", "pelota Adidas", "https://picsum.photos/200/300", 250, "PE01", 10)
        await pm.addProducts("pelota", "pelota Nike", "https://picsum.photos/200/300", 270, "PE02", 10)
        await pm.addProducts("pelota", "pelota Puma", "https://picsum.photos/200/300", 230, "PE03", 10)
        await pm.addProducts("botines", "botines Adidas", "https://picsum.photos/200/300", 550, "BO01", 10)
        await pm.addProducts("botines", "botines Nike", "https://picsum.photos/200/300", 450, "BO02", 10)
        await pm.addProducts("botines", "botines Puma", "https://picsum.photos/200/300", 350, "BO03", 10)
        await pm.addProducts("botines", "botines Puma", "https://picsum.photos/200/300", 350, "BO04", 10)
        console.log(await pm.getProducts())
        console.log(await pm.getProductById(2))
        console.log(await pm.getProductById(6))
        console.log(await pm.getProductById(1))
        await pm.deleteProduct(7)*/
        await pm.updateProduct(3,238,24)
    } catch (error){
        console.log(error.message)
    } 
}

entorno()