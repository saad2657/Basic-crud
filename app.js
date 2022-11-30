const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let table = document.getElementById('container')
let tabBody = document.getElementById('tbody')
let dyn_data;
let tab;
function responseData() {
    fetch('http://172.16.100.89:3000/users')
        .then(data => { return data.json() })
        .then(alldata => {
            dyn_data = alldata;
            tab = setData(dyn_data.users)
            tabBody.innerHTML = tab;
        })
        .catch(error => {
            return error
        })
}

if (id == null) {
    responseData()
}


function searchMe() {
    let myInp = document.getElementById('search').value.toUpperCase()
    let tr = table.getElementsByTagName('tr')
    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1]
        if (td) {
            let textVal = td.textContent
            if (textVal.toUpperCase().indexOf(myInp) > -1) {
                tr[i].style.display = ''
            } else {
                tr[i].style.display = 'none'
            }
        }
    }
    // let myInp = document.getElementById('search')
    // let res = []
    // dyn_data = dyn_data.filter(e => (e.name.indexOf(myInp.value) > -1) && res.push(e))
    // let tab = setData(dyn_data)
    // tabBody.innerHTML = tab
}


function setData(data) {
    let tab = ''
    console.log(data)
    for (var obj of dyn_data.users) {
        tab += `
              <tr class='main-tr'>
                    <td>${obj.id}</td>
                    <td class='name'>${obj.name}</td>
                    <td>${obj.username}</td>
                    <td>${obj.email}</td>
                    <td>${obj.address}</td>
                    <td>${obj.company}</td>
                    <td>${obj.phone}</td>
                    <td>${obj.city}</td>
                    <td>${obj.password}</td>
                    <td><button onclick="updatePostWithFetch(${obj.id})">Edit</button><button id="show4" onclick="deleteRow(${obj.id})">Delete</button></td>
                </tr>`
    }

    return tab
}


let myName = document.getElementById('name')
let userName = document.getElementById('username')
let email = document.getElementById('email')
let address = document.getElementById('address')
let company = document.getElementById('company')
let phone = document.getElementById('phone')
let city = document.getElementById('city')
let password = document.getElementById('password')

console.log()


function typeData() {
    window.location.assign('add.html')
}


function addRow() {
    for (var i = 0; i < tr.length; i++) {
        let tr = document.getElementById('tr')
        tr.innerHTML = `
                    <td>${i}</td>
                    <td>${myName.value}</td>
                    <td>${userName.value}</td>
                    <td>${email.value}</td>
                    <td>${address.value}</td>
                    <td>${company.value}</td>
                    <td>${phone.value}</td>
                    <td>${city.value}</td>
                    <td>${password.value}</td>
                   `
    }

}



if (id != null) {
    getOne()
}

function getOne() {
    fetch('http://172.16.100.89:3000/users/' + id)
        .then(data => { return data.json() })
        .then(res => {
            // console.log(res.data);
            let data = res.data;
            patchValues(data);
        })
        .catch(error => {
            return error
        })
}


function patchValues(resposne) {
    myName.value = resposne.name;
    userName.value = resposne.username;
    email.value = resposne.email;
    address.value = resposne.address;
    company.value = resposne.company;
    phone.value = resposne.phone;
    city.value = resposne.city;
    password.value = resposne.password;
}




// Add row from API

let alert1 = document.getElementById('alert1')
let alert2 = document.getElementById('alert2')
let alert3 = document.getElementById('alert3')
let alert4 = document.getElementById('alert4')
let alert5 = document.getElementById('alert5')
let alert6 = document.getElementById('alert6')
let alert7 = document.getElementById('alert7')
let alert8 = document.getElementById('alert8')
let form = document.getElementById('form')

function postData(e) {
    console.log(e);
    e.preventDefault();
    console.log(validateField(e));
    if (validateField(e) == false) {
        if (id != null && id != '' && id != undefined) {
            updateData();
        }
        else {
            postWithFetch();
        }
    }
}

function validateField(e) {

    let text1 = myName.value
    let text2 = userName.value
    let text3 = email.value
    let text4 = address.value
    let text5 = company.value
    let text6 = phone.value;
    let text7 = city.value;
    let text8 = password.value
    let validate = false;
    if (text1 == '' || text2 == '' || text3 == '' || text4 == ''
        || text5 == '' || text6 == '' || text7 == '' || text8 == '') {
        alert1.innerHTML = 'Please Fill This Field';
        alert2.innerHTML = 'Please Fill This Field';
        alert3.innerHTML = 'Please Fill This Field';
        alert4.innerHTML = 'Please Fill This Field';
        alert5.innerHTML = 'Please Fill This Field';
        alert6.innerHTML = 'Please Fill This Field';
        alert7.innerHTML = 'Please Fill This Field';
        alert8.innerHTML = 'Please Fill This Field';
        e.preventDefault();
        validate = true;
    }
    else if (!text1.match(/^[A-Za-z\s]+$/) || !text2.match(/^[A-Za-z\s]+$/) || !text4.match(/^[A-Za-z\s]+$/) || !text5.match(/^[A-Za-z\s]+$/) || !text7.match(/^[A-Za-z\s]+$/)) {
        alert1.innerHTML = 'Only Alphabets Here'
        alert2.innerHTML = 'Only Alphabets Here'
        alert4.innerHTML = 'Only Alphabets Here'
        alert5.innerHTML = 'Only Alphabets Here'
        alert7.innerHTML = 'Only Alphabets Here'
        e.preventDefault();
        validate = true;
    }
    else if (!text3.includes('@') || !text3.includes('.') || text3 == '') {
        alert3.innerHTML = 'Please Enter Valid Email'
        e.preventDefault();
        validate = true;
    }
    else if (!text6.match(/^[0-9]+$/)) {
        alert6.innerHTML = 'Please insert only numbers'
        e.preventDefault();
        validate = true;
    }
    else if (text8.length < 8) {
        alert8.innerHTML = 'Password must be at-least 8 characters'
        e.preventDefault();
        validate = true;
    }
    else {
        validate = false;
    }
    return validate;
}

function textNone() {
    if (myName.value.length > 0) {
        alert1.innerHTML = ''
    }
    if (userName.value.length > 0) {
        alert2.innerHTML = ''
    }
    if (email.value.length > 0) {
        alert3.innerHTML = ''
    }
    if (address.value.length > 0) {
        alert4.innerHTML = ''
    }
    if (company.value.length > 0) {
        alert5.innerHTML = ''
    }
    if (phone.value.length > 0) {
        alert6.innerHTML = ''
    }
    if (city.value.length > 0) {
        alert7.innerHTML = ''
    }
    if (password.value.length > 0) {
        alert8.innerHTML = ''
    }
}

function postWithFetch() {
    fetch('http://172.16.100.89:3000/users', {
        method: 'POST',
        body: JSON.stringify({
            name: myName.value,
            username: userName.value,
            email: email.value,
            address: address.value,
            company: company.value,
            phone: phone.value,
            city: city.value,
            password: password.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(res => { return res.json() })
        .then(pData => {
            if (pData.statusCode == 200) {
                window.location.href = 'index.html';
            }
            console.log(pData)
        })
        .catch(error => console.log(error))
}

function updatePostWithFetch(id) {
    window.location.href = `add.html?id=${id}`;
}


function updateData() {
    fetch('http://172.16.100.89:3000/users/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: myName.value,
            username: userName.value,
            email: email.value,
            address: address.value,
            company: company.value,
            phone: phone.value,
            city: city.value,
            password: password.value
        }),
    })
        .then(res => { return res.json() })
        .then(pData => {
            if (pData.statusCode == 200) {
                window.location.href = 'index.html';
            }
            console.log(pData)
        })
        .catch(error => console.log(error))
}

// console.log(userName)



let showPass = document.getElementById('show')
let showHide = document.getElementById('text')

function showPassword() {
    if (showPass.checked != false && showHide.innerHTML == 'Show') {
        password.setAttribute('type', 'text')
        showHide.innerHTML = 'Hide'
    }
    else {
        password.setAttribute('type', 'password')
        showHide.innerHTML = 'Show'
    }
}



function deleteRow(id) {
    fetch('http://172.16.100.89:3000/users/' + id, {
        method: 'DELETE',
        body: JSON.stringify({

        })
    })
        .then(res => res.json())
        .then(res1 => {
            if (res1.statusCode == 200) {
                alert(res1.message);
                responseData();
            }
        })


}






