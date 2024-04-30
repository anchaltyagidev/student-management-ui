var students = []
const addButton = document.getElementById("add")
const updateButton = document.getElementById("update")
const data = document.getElementById("data")

addButton.addEventListener("click", addStudent)
updateButton.addEventListener('click', updateStudent)

function updateStudent(e) {
    const editname = document.getElementById("editsname")
    const editid = document.getElementById("editsid")
    const editemail= document.getElementById("editsemail")
    const editcontact = document.getElementById("editsphone")

    i = students.findIndex(x => x.id === editid.value)
    student = new Student(editname.value, editid.value, editemail.value, editcontact.value)
    let err= student.validate()
    if (err) {
        alert(err)
        return;
    }
    students[i] = student
    localStorage.setItem("students", JSON.stringify(students))
    window.location.reload()
}

var modal = document.getElementById("myModal");
var span = document.getElementById("close");

window.addEventListener("load", (event) => {
    // read existing data from local storage and show it
    students = JSON.parse(localStorage.getItem("students"));
    console.log(students)

    if (students) {
        for (let s of students) {
            row = studentToHTML(s);
            data.append(row);
        }
    } else { 
        students = []
    }

    span.onclick = function () {
        modal.style.display = "none";
    };
})

class Student {
    constructor(name, id, email, contact) {
        this.name = name
        this.id = id
        this.email = email
        this.contact = contact
    }

    validate() {
        if (this.name === "" || this.id === "" || this.email === "" || this.contact === "") { 
            return 'all fields are required'
        }

        // check for alphabets and spaces
        if (!/^[a-zA-Z\ ]+$/.test(this.name)) { 
            console.log(this.name)
            return 'name should only contain alphabets'
        }

        // check for numeric
        if (isNaN(this.id)) { 
            return 'id should be all numeric'
        }

        // check for numeric
        if (isNaN(this.contact)) {
            console.log(this.contact)
            return 'contact should be all numeric'
        }
    }
}

function studentToHTML(student) { 
    const row = document.createElement('tr')
    const tdname = document.createElement('td')
    const tdid = document.createElement('td')
    const tdemail = document.createElement('td')
    const tdcontact = document.createElement('td')
    
    const tdActions = document.createElement('td')
    const tdResetButton = document.createElement('Button')

    // add listeners to row buttons
    tdResetButton.addEventListener("click", (e) => {
        modal.style.display = "block";
        const editname = document.getElementById("editsname")
        const editid = document.getElementById("editsid")
        const editemail= document.getElementById("editsemail")
        const editcontact = document.getElementById("editsphone")
        editname.value = student.name
        editid.value = student.id
        editemail.value = student.email
        editcontact.value=student.contact
    });
    
    const tdRemoveButton = document.createElement('Button')
    tdRemoveButton.addEventListener("click", (e) => { 
        i = students.indexOf(student)
        students.splice(i, 1)
        localStorage.setItem("students", JSON.stringify(students))
        e.currentTarget.parentElement.parentElement.remove();
    })

    tdRemoveButton.innerHTML = `<span class="material-symbols-outlined icon">delete</span>`
    tdResetButton.innerHTML = "Edit"
    tdActions.appendChild(tdResetButton)
    tdActions.appendChild(tdRemoveButton)

    tdname.innerHTML = student.name
    row.appendChild(tdname)
    tdid.innerHTML = student.id
    row.appendChild(tdid)
    tdemail.innerHTML = student.email
    row.appendChild(tdemail)
    tdcontact.innerHTML = student.contact
    row.appendChild(tdcontact)
    row.appendChild(tdActions)
    
    return row
}

function addStudent(e) { 
    const name = document.getElementById("sname")
    const id = document.getElementById("sid")
    const contact = document.getElementById("sphone")
    const email = document.getElementById("semail")
    const student = new Student(name.value, id.value, email.value, contact.value)
    let err= student.validate()
    if (err) {
        // alert if form is invalid
        alert(err)
        return;
    }

    // save to local storage
    students.push(student)
    localStorage.setItem("students",JSON.stringify(students) );
    
    row = studentToHTML(student)
    data.append(row) 

    // empty form
    name.value = ""
    id.value = ""
    contact.value = ""
    email.value = ""
}
