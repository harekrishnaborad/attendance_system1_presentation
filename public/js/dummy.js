// let form = document.querySelector('form')
// form.addEventListener('submit', function (event) {
//     let options = document.querySelectorAll('.options')
//     options.forEach(option => {
//         option.checked = true
        
//     });
//     let selectAll = document.querySelector('#selectAll')
//     selectAll.checked = false
//     let present = document.querySelector('#present')
//     present.checked = false
//     let absent = document.querySelector('#absent')
//     absent.checked = false
//     form.submit()
// })

let submit_btn = document.querySelector('#submit')
submit_btn.addEventListener('click', function () {
    let options = document.querySelectorAll('.options')
    options.forEach(option => {
        option.checked = true
        // option.value = 'p/a'
        // let id = option.id
        // let label = `${id}_label`
        // let label_elem = document.getElementById(`${label}`)
        // label_elem.innerText = 'p/a'
        
    });
    let selectAll = document.querySelector('#selectAll')
    selectAll.checked = false
    let present = document.querySelector('#present')
    present.checked = false
    let absent = document.querySelector('#absent')
    absent.checked = false
})

let reset_btn = document.querySelector('#reset')
reset_btn.addEventListener('click', function () {
    let options = document.querySelectorAll('.options')
    options.forEach(option => {
        option.checked = false
        option.value = 'p/a'
        let id = option.id
        let label = `${id}_label`
        let label_elem = document.getElementById(`${label}`)
        label_elem.innerText = 'p/a'
        
    });
    let selectAll = document.querySelector('#selectAll')
    selectAll.checked = false
    let present = document.querySelector('#present')
    present.checked = false
    let absent = document.querySelector('#absent')
    absent.checked = false
})



let options = document.querySelectorAll('.options')
options.forEach(option => {
    option.addEventListener('click', function () {
        // let id = option.id
        // let label = `${id}_label`
        // let label_elem = document.getElementById(`${label}`)
        console.log(option.value)
        
        if (option.value == 'present') {
            option.value = 'absent'
            let id = option.id
            let label = `${id}_label`
            let label_elem = document.getElementById(`${label}`)
            label_elem.innerText = 'absent'
        }else if (option.value == 'absent'){
            option.value = 'present'
            let id = option.id
            let label = `${id}_label`
            let label_elem = document.getElementById(`${label}`)
            label_elem.innerText = 'present'
        }
        
    })
});


let selectAll = document.querySelector('#selectAll')
selectAll.addEventListener('click', function () {
    let options = document.querySelectorAll(".options")

    options.forEach(option => {
        if (selectAll.checked == true) {
            option.checked = true
        }else{
            option.checked = false
        }
    });
})

let present = document.querySelector('#present')
present.addEventListener('click', function () {
    let options = document.querySelectorAll(".options")

    options.forEach(option => {
        if (option.checked == true) {
            option.value = 'present'
            let id = option.id
            let label = `${id}_label`
            let label_elem = document.getElementById(`${label}`)
            label_elem.innerText = 'present'
        }else{
            option.value = 'absent'
            let id = option.id
            let label = `${id}_label`
            let label_elem = document.getElementById(`${label}`)
            label_elem.innerText = 'absent'

        }
    });
})

let absent = document.querySelector('#absent')
absent.addEventListener('click', function () {
    let options = document.querySelectorAll(".options")

    options.forEach(option => {
        if (option.checked == false) {
            option.value = 'present'
            let id = option.id
            let label = `${id}_label`
            let label_elem = document.getElementById(`${label}`)
            label_elem.innerText = 'present'

        }else{
            option.value = 'absent'
            let id = option.id
            let label = `${id}_label`
            let label_elem = document.getElementById(`${label}`)
            label_elem.innerText = 'absent'
        }
    });
})




let course = document.querySelector("#course")
course.addEventListener('change', function () {
    console.log("this workd")
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/info/courses', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = function () {
        let data = JSON.parse(this.responseText)
        let branch = data.branch
        let sem = data.sem
        console.log(data + "this is data")


        reset_parent('#branch', `<option value="">select a branch</option>`)
        reset_parent('#sem', `<option value="">select a semister</option>`)
        branch.forEach(elem => {
            addElement_in_HTML('#branch', "option", `${elem.branch}`)
        });
        sem.forEach(elem => {
            addElement_in_HTML('#sem', "option", `${elem.sem}`)
        });
        
    }
    let value = course.value
    const body = JSON.stringify({
        value: value
    });
    xhr.send(body)
})



let sem = document.querySelector("#sem")
sem.addEventListener('change', function () {
    console.log("this workd")
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/info/sem', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = function () {
        let data = JSON.parse(this.responseText)
        let subjects = data.subject

        reset_parent('#subject', `<option value="">select a subject</option>`)
        subjects.forEach(subject => {
            addElement_in_HTML('#subject', "option", `${subject.subject}`)
        });
    }
    let branch = document.querySelector("#branch")
    let course_value = course.value
    let branch_value = branch.value
    let sem_value = sem.value
    const body = JSON.stringify({
        course: course_value,
        branch: branch_value,
        sem: sem_value
    });
    xhr.send(body)
})





function addElement_in_HTML(parent, child, value) {
    let parent_ = document.querySelector(`${parent}`)
    let child_ = document.createElement(`${child}`)
    child_.id = value
    child_.value = value
    child_.innerText = value
    child_.setAttribute('name', `${value}`)
    parent_.append(child_)
}

function reset_parent(parent, value) {
    document.querySelector(`${parent}`).innerHTML = `${value}`
}


