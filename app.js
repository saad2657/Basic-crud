const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

let myName = document.getElementById('name')
let userName = document.getElementById('username')
let email = document.getElementById('email')
let address = document.getElementById('address')
let company = document.getElementById('company')
let phone = document.getElementById('phone')
let city = document.getElementById('city')
let password = document.getElementById('password')



// Add row from API

let alert1 = document.getElementById('alert1');
let alert2 = document.getElementById('alert2');
let alert3 = document.getElementById('alert3');
let alert4 = document.getElementById('alert4');
let alert5 = document.getElementById('alert5');
let alert6 = document.getElementById('alert6');
let alert7 = document.getElementById('alert7');
let alert8 = document.getElementById('alert8');
let form = document.getElementById('form');
let showPass = document.getElementById('show');
let showHide = document.getElementById('text');

if (id != null) {
    getOne()
}


function getOne() {
    fetch('http://172.16.100.89:3000/users/' + id)
        .then(data => { return data.json() })
        .then(res => {
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
            'Content-type': 'application/json',
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


