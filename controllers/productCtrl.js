const Products = require('../models/productModel')


//filter
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString }
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regax)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))
        return this;


    }
    sorting() { }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 21
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this

    }
}



const product = {

    getProducts: async (req, res) => {
        try {

            const features = new APIfeatures(Products.find(), req.query)
                .filtering().paginating()

            const products = await features.query

            res.json({

                status: "sucess",
                result: products.length,
                products: products

            })






        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }
    },
    createProducts: async (req, res) => {
        try {
            const { product_id, name, price, description, flavor1, flavor2, flavor3, flavor4, images } = req.body;
            if (!images) return res.status(400).json({ msg: "No image uploaded" })

            const product = await Products.findOne({ product_id })
            if (product) return res.status(400).json({ msg: "this product already exists" })

            const newProduct = new Products({
                product_id, name: name.toLowerCase(), price, description, flavor1, flavor2, flavor3, flavor4, images
            })

            await newProduct.save()
            res.json({ msg: "created a product" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ mag: "Product Deleted" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }
    },
    updateProduct: async (req, res) => {
        try {
            const { name, price, description, flavor1, flavor2, flavor3, flavor4, images } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                name: name.toLowerCase(), price, description, flavor1, flavor2, flavor3, flavor4, images
            })
            res.json({ msg: "Product updated" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }
    }

}

module.exports = product