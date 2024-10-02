const Order = require("../models/Order")

const ordersController = {
    //GET /orders
    index: async (req,res) => {
        const orders = await Order.findAll()
        res.status(201).json(orders)
    },

    //POST /orders create orders
    create: async (req,res) => {
        const newOrder = await Order.create(
            req.body.customerId,
            req.body.products //array { id: number, quantity}
        )
        if(!newOrder instanceof Order) {
            return res.status(400).json(newOrder)
        } else {
            res.status(201).json(newOrder)
        }
    },
    //GET /orders/:id
    show: async (req,res) => {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    },

    //DELETE /orders/:id
    delete: async (req,res) => {
        const result = await Order.delete(req.params.id)
        res.json(result)
    }
}

module.exports = ordersController