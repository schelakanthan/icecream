const router = require('express').Router()
const product = require('../controllers/productCtrl')

router.route('/products')
    .get(product.getProducts)
    .post(product.createProducts)


router.route('/product/:id')
    .delete(product.deleteProduct)
    .put(product.updateProduct)

module.exports = router