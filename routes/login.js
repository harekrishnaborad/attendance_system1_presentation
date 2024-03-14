const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')


const noLoggin = (req, res, next) => {
    if(req.session.isAuth){
        res.redirect(`${req.session.user_id.role}`)
    }else{
        next()
    }
}

router.get('/', noLoggin, loginController.getRegister)
router.get('/login', noLoggin, loginController.getLogin)
router.post('/checkUsers', noLoggin, loginController.checkUsers)
router.post('/add_User', noLoggin, loginController.addUser)
router.get('/redirect', loginController.redirect_user)
module.exports = router