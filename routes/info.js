const express = require('express')
const router = express.Router()
const facultyController = require('../controllers/faculty')
const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login', {info: "error"})
    }
}

// router.get('/dummy',isAuth, facultyController.getDummy)
router.post('/courses', isAuth,facultyController.courses)
router.post('/sem', isAuth,facultyController.sem)

// router.post('/addAttendance', isAuth, facultyController.addAttendance)

module.exports = router