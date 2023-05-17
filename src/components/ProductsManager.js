import {promises as fs} from "fs"

export default class ProductManager {

    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {
        
        ProductManager.id++
        let newProduct = {
            title,
            description, 
            price, 
            image, 
            code, 
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch,JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2) 
    }

    getProductsById = async (id) =>{
        let respuesta3 = await this.readProducts()

        if (!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta3.find(product => product.id === id))
        }

    }
    
    deleteProductsById = async (id) =>{
        let respuesta3 = await this.readProducts() 
        let productFilter = respuesta3.filter(products => products.id != id)

        await fs.writeFile(this.patch,JSON.stringify(productFilter))
        
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)

        let ProductOld = await this.readProducts()

        let productsModif = [{...producto, id}, ...ProductOld]
        await fs.writeFile(this.patch,JSON.stringify(productsModif))
    }

}

// const productos = new ProductManager

/*
productos.addProduct("Titulo1", "Description1", 1000, "Image1", "asda11", 1)
productos.addProduct("Titulo2", "Description2", 2000, "Image2", "asda12", 2) 
productos.addProduct("Titulo3", "Description3", 3000, "Image3", "asda13", 3)
productos.addProduct("Titulo4", "Description4", 4000, "Image4", "asda14", 4) 
productos.addProduct("Titulo5", "Description5", 5000, "Image5", "asda15", 5)
productos.addProduct("Titulo6", "Description6", 6000, "Image6", "asda16", 6) 
productos.addProduct("Titulo7", "Description7", 7000, "Image7", "asda17", 7)
productos.addProduct("Titulo8", "Description8", 9000, "Image8", "asda18", 8) 
*/

// productos.getProducts()

// productos.getProductsById(1)

// productos.deleteProductsById(1)

/*
productos.updateProducts({
    title: 'Titulo3',
    description: 'Description3',
    price: 1000,
    image: 'Image3',
    code: 'asda13',
    stock: 4,
    id: 3
})
*/