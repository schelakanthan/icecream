const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/author')


router.post('/signup',userCtrl.signup)

router.post('/login',userCtrl.login)

router.get('/logout',userCtrl.logout)

router.get('/refresh_token',userCtrl.refreshToken)

router.get('/infor',auth,userCtrl.getUser)
 
router.patch('/addcart', auth, userCtrl.addCart)

router.get('/history', auth, userCtrl.history)






module.exports = router
