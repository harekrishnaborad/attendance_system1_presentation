const { request, response } = require('express')
const dbs = require('../models/dbs')

let attendance = 'attendance'
// let users = 'users'
let subjects = 'subjects'
let master_table = `master_table`
let subject_master_table = `d_2`

module.exports = {
    getHome: (request, response) => {
        response.render('faculty_home.ejs', {user_id: request.session.user_id,})
    },

    attendance_exists: (request, response) => {
        response.render('attendance_exists.ejs', {user_id: request.session.user_id,})
    },

    getScanner: async (request, response) => {
        let data = await dbs.queries([`select * from ${subjects};`])
        console.log(data)
        response.render('scanner.ejs', { subjects: data[0] ,user_id: request.session.user_id,})
    },

    show_attendance: async (request, response) => {
        if (request.body == {}) {
            // console.log(request.body)
        }
        let data = await dbs.queries([`SELECT distinct date_format(date, "%Y-%m-%d") as date from ${attendance};`, `select * from ${subjects}`
        // `select distinct subject from ${attendance};`,
        , `select distinct * from users;`])
        let distinct_date = data[0]
        let distinct_subject = data[1]
        console.log(distinct_date, distinct_subject, request.session.user_id)
        response.render('show_attendance.ejs', 
        {   distinct_date: distinct_date, 
            distinct_subject: distinct_subject, 
            result_attendance: "no",
            user_id: request.session.user_id,
        })
    },

    showAttendance: async (request, response) => {
        if (request.body.subject != "" && request.body.date != "") {
            let data = await dbs.queries([
                `SELECT distinct date_format(date, "%Y-%m-%d") as date from ${attendance};`,
                // `select distinct subject from ${attendance};`,
                `select * from ${subjects}`
                `select date_format(date, "%Y-%m-%d") as date, time, subject, present from ${attendance} where date = '${request.body.date}' AND subject = '${request.body.subject}';`
            ])
            

            let distinct_date = data[0]
            let distinct_subject = data[1]
            let result_attendance = data[2]
            // console.log(result_attendance, request.body.subject, request.body.date)
            response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance ,user_id: request.session.user_id,})


        } else if (request.body.subject != "") {
            let data = await dbs.queries([
                `SELECT distinct date_format(date, "%Y-%m-%d") as date from ${attendance};`,
                `select * from ${subjects}`,
                // `select distinct subject from ${attendance};`,
                `select date_format(date, "%Y-%m-%d") as date, time, subject, present from ${attendance} where subject = '${request.body.subject}';`
            ])
            console.log(data)

            let distinct_date = data[0]
            let distinct_subject = data[1]
            let result_attendance = data[2]
            // console.log(result_attendance)
            response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance ,user_id: request.session.user_id})


        } else if (request.body.date != "") {
            let data = await dbs.queries([
                `SELECT distinct date_format(date, "%Y-%m-%d") as date from ${attendance};`,
                `select * from ${subjects}`,
                // `select distinct subject from ${attendance};`,
                `select date_format(date, "%Y-%m-%d") as date, time, subject, present from ${attendance} where date = '${request.body.date}';`
            ])

            let distinct_date = data[0]
            let distinct_subject = data[1]
            let result_attendance = data[2]
            // console.log(result_attendance)
            response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance ,user_id: request.session.user_id})


        } else {
            let data = await dbs.queries([
                `SELECT distinct date_format(date, "%Y-%m-%d") as date from ${attendance};`,
                `select * from ${subjects}`
                // `select distinct subject from ${attendance};`,
            ])

            let distinct_date = data[0]
            let distinct_subject = data[1]
            response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: "no" ,user_id: request.session.user_id})
        }
    },

    delete_attendance: async (request, response) => {
        let data = await dbs.queries([`select distinct * from users;`])
        // console.log(data)
        response.render('delete_attendance.ejs', { message: "data", user: data[0], user_id: request.session.user_id })
    },

    deleteAttendance: async (request, response) => {
        let data = await dbs.queries([`delete from ${attendance} where ${request.body.field} = '${request.body.field_value}';`])
        console.log(request.body)

        response.redirect("/faculty/show_attendance")
    },

    update_attendance: async(request, response) => {
        let data = await dbs.queries([`select * from ${subjects};`])
        // console.log(data)
        response.render('update_attendance.ejs', { user_id: request.session.user_id, subjects: data[0] })
    },
    
    updateAttendance: async(request, response) => {
        let date_time = new Date();
        let date = ("0" + date_time.getDate()).slice(-2);
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
        let year = date_time.getFullYear();
        let hours = date_time.getHours();
        let minutes = date_time.getMinutes();
        let seconds = date_time.getSeconds();

        let current_date_update = year + "-" + month + "-" + date
        let current_time_update = hours + ":" + minutes
        let input_date = request.body.date
        let input_time = request.body.time
        if (current_date_update == input_date && current_time_update == input_time) {
            response.redirect(`/${request.session.user_id.role}/scanner`)
        }
        else if(current_date_update < input_date){
            response.redirect(`/${request.session.user_id.role}/update_attendance`)
        }
        else if (current_date_update == input_date && current_time_update < input_time) {
            response.redirect(`/${request.session.user_id.role}/update_attendance`)
        }
        else{
            let data = await dbs.queries([`insert into ${attendance}(date, time, subject, present) values('${input_date}', '${input_time}', "${request.body.subject}", ${request.body.enno});`])

            response.redirect(`/${request.session.user_id.role}/show_attendance`)
            console.log(request.body)
        }
        // console.log(year + "-" + month + "-" + date);
        // console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

        console.log(request.body.date)
        console.log(request.body.time)
        
    },

    addEnrollmentNo: async (request, response) => {
        let show_attendance_1 = await dbs.queries([`SELECT date_format(date, "%Y-%m-%d") as date, subject, present from ${attendance};`])
        let attendance_1 = show_attendance_1[0]

        console.log(attendance_1)

        let date_time = new Date();
        let date = ("0" + date_time.getDate()).slice(-2);
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
        let year = date_time.getFullYear();

        let current_date_update = year + "-" + month + "-" + date
        
        let attendance_exists = false
        attendance_1.forEach(element => {
            if (current_date_update == element.date && request.body.subject_name_value == element.subject && request.body.enrollment_no == element.present) {
                attendance_exists = true
            }
            // console.log(element)
        });

        

        if (attendance_exists == false) {
            let data = await dbs.queries([`insert into ${attendance}(date, time, subject, present) values(current_date(), current_time(), "${request.body.subject_name_value}", ${request.body.enrollment_no});`])
        }

        response.redirect(`/${request.session.user_id.role}/scanner`)
        // console.log(request.body)
    },

    manually_add_user: async (request, response) => {
        // let eno = request.body.enno
        
        let data = await dbs.queries([`insert into ${attendance}(date, time, subject, present) values(current_date(), current_time(), "${request.body.subject}", ${request.body.enno});`])

        response.redirect(`/${request.session.user_id.role}/scanner`)
        console.log(request.body)
    },

    logout: (request, response) => {
        request.session.destroy((err) => {
            if (err) throw err;
            response.redirect('/')
        })
    },

    take_attendance: async(request,response)=>{
        response.render('dymmy.ejs', {user_id: request.session.user_id, send_data: "null", error: "noError", attendance: "no"})
    },

    getTable: async(request,response)=>{
        let data = await dbs.queries([`select sr_no, Enrollment_no, Student_name from ${subject_master_table} where sr_no > 0`])
        console.log(request.body)
        response.render('dymmy.ejs', {user_id: request.session.user_id, send_data: "null", error: "noError", attendance: data[0]})
    },

    courses: async(request,response)=>{
        // let fakeData = {'name': 'name'}
        
        console.log(request.body)
        let data = await dbs.queries([`select distinct branch from ${master_table} where course  = '${request.body.value}';`,`select distinct sem from ${master_table} where course  = '${request.body.value}';`])
        // console.log(data)
        let branch_data = data[0]
        let sem_data = data[1]
        let send_data = {
            'branch': branch_data,
            'sem': sem_data
        }
        // console.log(send_data)
        response.json(send_data)
        // response.render('dymmy.ejs', {send_data: send_data, error: "send_data"})
    },

    sem: async(request,response)=>{
        // let fakeData = {'name': 'name'}
        
        console.log(request.body)
        let data = await dbs.queries([`select distinct subject from ${master_table} where sem  = '${request.body
        .sem}' and branch = '${request.body.branch}' and course = '${request.body.course}';`])
        console.log(data)
        let subject_data = data[0]
        let send_data = {
            'subject': subject_data,
        }
        // console.log(send_data)
        response.json(send_data)
        // response.render('dymmy.ejs', {send_data: send_data, error: "send_data"})
    },

    addAttendance: async(req, res) => {
        let keys = Object.keys(req.body)
        keys.forEach(async(key) => {
            if (key != "course" || key != "branch" || key != "sem") {
                let data = await dbs.dummy([`update dummy_1 set D_1 = '${req.body[key]}' where Enrollment_no = '${key}'`], ['CREATE TABLE dummy_1 AS SELECT * FROM d_2;'],"dummy_1")
            }
        });
    },
}