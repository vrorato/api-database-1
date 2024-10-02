const Customer = require("../models/Customer")

const customersController = {
    //GET /customers
    index: async(req,res) => {
        const customers = await Customer.findAll()
        res.status(200).json(customers)
    },
    //GET /customers/:id
    show: async (req,res) => {
        const customer = await Customer.findById(req.params.id)
        if(!customer) return res.status(404).json({message:'Customer not found!'})
        res.status(201).json(customer)
    },
    //POST /customers
    create: async (req,res) => {
        try {
            const newCustomer = await Customer.create(req.body)
            res.status(201).json(newCustomer)
        } catch (error) {
            res.status(400).json({message:error.message})
        }
        
    },
    //PUT /customers/:id
    update: async (req,res) => {
        const updatedCustomer = await Customer.update(req.params.id,req.body)
        if(!updatedCustomer) return res.status(404).json({message:'Customer not found!'})
        res.status(201).json(updatedCustomer)
    },
    //DELETE /customers/:id
    delete: async (req,res) => {
        const deletedCustomer = await Customer.delete(req.params.id)
        if(!deletedCustomer) return res.status(404).json({message:'Customer not found!'})
        res.status(201).json(deletedCustomer)
    }
}

module.exports = customersController