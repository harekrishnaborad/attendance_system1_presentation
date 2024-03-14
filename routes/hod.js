const express = require('express')
const router = express.Router()
const hodController = require('../controllers/hod')
const facultyController = require('../controllers/faculty')
const multer  = require('multer')


const isAuth = (req, res, next) => {
    if(req.session.isAuth && req.session.user_id.role == 'hod'){
        next()
    }else if (req.session.isAuth) {
        res.redirect('/faculty')
    }else{
        res.redirect('/login')
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp/my_uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${Date.now()}.csv` )
    }
})

const upload = multer({storage})

router.get('/attendance_exists',isAuth, facultyController.attendance_exists)


router.get('/',isAuth, hodController.getHome)
router.get('/uploads',isAuth, facultyController.upload_page)
router.get('/take_attendance',isAuth, facultyController.take_attendance)
router.get('/show_taken_attendance',isAuth, facultyController.show_taken_attendance)

router.get('/scanner', isAuth,facultyController.getScanner)
router.get('/show_attendance',isAuth, facultyController.show_attendance)
router.get('/update_attendance',isAuth, facultyController.update_attendance)
router.get('/delete_attendance',isAuth, facultyController.delete_attendance)
// router.get('/dummy', facultyController.dummy)

router.post('/showAttendance',isAuth, facultyController.showAttendance)
router.post('/updateAttendance',isAuth, facultyController.updateAttendance)
router.post('/deleteAttendance',isAuth, facultyController.deleteAttendance)
router.post('/addEnrollmentNo',isAuth, facultyController.addEnrollmentNo)
router.post('/manually_add_user',isAuth, facultyController.manually_add_user)



router.get('/create_subject',isAuth, hodController.create_subject)
router.get('/show_subject',isAuth, hodController.show_subject)
router.get('/update_subject',isAuth, hodController.update_subject)
router.get('/delete_subject',isAuth, hodController.delete_subject)


router.post('/createSubject',isAuth, hodController.createSubject)
router.post('/updateSubject',isAuth, hodController.updateSubject)
router.post('/deleteSubject',isAuth, hodController.deleteSubject)
router.post('/logout', isAuth, hodController.logout)
// router.post('/courses', isAuth, hodController.courses)
router.post('/addAttendance', isAuth, facultyController.addAttendance)
router.post('/getTable', isAuth,facultyController.getTable)
router.post('/showTable', isAuth,facultyController.showTable)
router.post('/uploads_file', [isAuth, upload.single("upload_file")],facultyController.uploads_file)



module.exports = router