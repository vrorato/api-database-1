const { query } = require("../database")


// consultas sql ao banco de dados
class Product {
    constructor(productRow){
        this.id = productRow.id
        this.name = productRow.name
        this.description = productRow.description
        this.price = +productRow.price
        this.stockQuantity = productRow.stock_quantity
        this.createdAt = new Date(productRow.created_at)
        this.updatedAt = new Date(productRow.updated_at)
        this.isActive = productRow.is_active
    }

    static async findAll(){
        const result = await query(`SELECT * FROM products;`)
        return result.rows.map((row) => new Product(row))
    }

    //create product
    static async create({ name, description,price,stockQuantity,isActive}) {
        const result = await query(
            `INSERT INTO products (name, description,price,stock_quantity,is_active)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *`,
            [name,description,price,stockQuantity,isActive]
        )
        return new Product(result.rows[0])
    }

    //find by ID
    static async findById(id){
        const result = await query(`SELECT * FROM products WHERE id = $1`,[id])
        if (!result.rows[0]) return null
        return new Product(result.rows[0])
    }

    //update product by id
    static async update(id, attributes) {
        const { rows } = await query(`SELECT * FROM products WHERE id = $1`,[id])
        if(!rows[0]) return null
        const product = new Product(rows[0])

        Object.assign(product,attributes)
        product.updatedAt = new Date()
        await query(
            `UPDATE products SET
            name = $1,
            description = $2,
            stock_quantity = $3,
            is_active = $4,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $6;`,
            [product.name, product.description, product.price,product.stockQuantity,product.isActive,product.id]
        )
        return product
    }
    // delete
    static async delete(id) {
        await query(`DELETE FROM products WHERE id = $1`,[id])
        return { message: `Product deleted successfully!`}
    }
}

module.exports = Product