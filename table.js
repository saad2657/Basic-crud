let table = document.getElementById('container')
let tBody = document.getElementById('tbody')
var dyn_data;
let tab;
let max = 10
let min = 0



function responseData() {
    fetch('http://172.16.100.89:3000/users')
        .then(data => { return data.json() })
        .then(alldata => {
            dyn_data = alldata.users;
            tab = setData(dyn_data)
        })
        .catch(error => {
            return error

        })
}
responseData();

function setData(data) {
    let i = 0
    let tab = ''
    for (var obj of data) {
        if (i > 9) {
            break;
        }
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
        i++

    }
    tBody.innerHTML = tab;
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
}

function start(){
    let page1 = dyn_data.slice(min, dyn_data.length)
    setData(page1)
}

function next(e) {
    max = max+10
    min = min+10
    let nextPage = dyn_data.slice(min,max)
    setData(nextPage);
    if(nextPage.length == 0){
        e.disabled = true
    }
}


function previous() {
    max = max-10
    min = min-10
    let prePage = dyn_data.slice(min, max)
    setData(prePage)

}

function last(){
   let lasPage = dyn_data.slice()
}

function typeData() {
    window.location.assign('add.html')
}

function updatePostWithFetch(id) {
    window.location.href = `add.html?id=${id}`;
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
};


// PAGINATION WORK

// let pageUl = document.querySelector('.pagination');
// let itemShow = document.querySelector('#itemperpage')
// let tr = tabBody.getElementsByTagName('tr');

// let emptyBox = [];
// let index = 1;
// let itemPerPage = 5;

// for (var i = 0; i < tr.length; i++) {
//     emptyBox.push(tr[i]);
// }

// itemShow.onclick = rowPerPage()

// function rowPerPage(){
//     itemPerPage = Number(this.value)
// }

// function displayPage(limit){
//     tabBody.innerHTML = ''
//     for(var i = 0; i < limit.length; i++){
//         tabBody.appendChild(emptyBox[i])
//     }
// }

// displayPage(itemPerPage)

//----------------------------------------------//

// let page = 0;

// // next.addEventListener('click', ()=> {
// //     page == tBody.length - 10 ? (page = 0) : (page += 10);
// //     tBody.innerHTML = ''
// //     for(var i = page; i < page + 10; i++){
// //         tBody.appendChild(tr[i])
// //     }
// // })

// // previous.addEventListener('click', ()=> {
// //     page == 0 ? (page = tBody.length -10) : (page -= 10);
// //     tBody.innerHTML = ''
// //     for(var i = page; i < page + 10; i++){
// //         tBody.appendChild(tr[i])
// //     }
// // })

























