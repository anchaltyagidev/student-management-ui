const form = document.getElementById("add")
const data= document.getElementById("data")
form.addEventListener("click", addStudent)


class Student {
    constructor(name, id, email, contact) {
        this.name = name
        this.id = id
        this.email = email
        this.contact = contact
    }
}

function addStudent(e) { 
    const name = document.getElementById("sname")
    const id = document.getElementById("sid")
    const contact = document.getElementById("sphone")
    const email = document.getElementById("semail")
    const student = new Student(name.value, id.value, contact.value, email.value)

    const row = document.createElement('tr')
    const tdname = document.createElement('td')
    const tdid = document.createElement('td')
    const tdemail = document.createElement('td')
    const tdcontact = document.createElement('td')
    
    const tdActions = document.createElement('td')
    const tdResetButton = document.createElement('Button')
    const tdRemoveButton = document.createElement('Button')

    tdResetButton.innerHTML = "Reset"
    tdRemoveButton.innerHTML = "Remove"
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
    

    data.append(row)
    
}
