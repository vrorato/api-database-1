const Product = require("../models/Product")

//methods for API CRUD
const productsController = {
    //GET /products - show all the products available
    index: async (req,res) => {
        const products = await Product.findAll()
        res.json(products)
    },
    //GET /products/:id - show specific product by id
    show: async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (product === null) return res.status(404).json({ message: "Product not found!" })
        res.json(product)
    },
    //POST /products - save new products
    create: async (req, res) => {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct) 
    },
    //PUT /products/:id - update specific products
    update: async (req,res) => {
        const updatedProduct = await Product.update(req.params.id,req.body)
        if (updatedProduct === null) return res.status(404).json({ message: "Product not found!" })
        res.json(updatedProduct)
    },
    //DELETE /products/:id - delete specific product
    delete: async (req,res) => {
        const result = await Product.delete(req.params.id)
        res.json(result)
    }
}

module.exports = productsController