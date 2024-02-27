var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    username = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"), 
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo =  document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector('#userForm .modal-title')
    

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
let isEdit = false, editId   

file.onchange = function(){
    if(file.files[0].size < 1000000){  //1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
             imgUrl = e.target.result
            imgInput.src = imgUrl;
        }
        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This File is too Large");
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element , index) => {
        let createElement = `<tr class = "employeeDetails">
            <td>${index+1}</td>
            <td><img src = "${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>

        <td>
            <button class="btn btn-success" onclick="readInfo('${element.picture}','${element.employeeName}',
            '${element.employeeAge}','${element.employeeCity}','${element.employeeEmail}','${element.employeePhone}',
            '${element.employeePost}','${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData">
            <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            
            <button class="btn btn-primary"  onclick="editInfo(${index},'${element.picture}','${element.employeeName}',
            '${element.employeeAge}','${element.employeeCity}','${element.employeeEmail}','${element.employeePhone}',
            '${element.employeePost}','${element.startDate}')"  data-bs-toggle="modal" data-bs-target="#userForm" >
            <i class="fa fa-pencil-square" aria-hidden="true"></i>
            </button>
            
            <button class="btn btn-danger" onclick="delteInfo(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()    

function delteInfo(index){
    if(confirm("Are You Sure You Want To Delete ?..."))
    getData.splice(index,1)
    localStorage.setItem("userProfile" , JSON.stringify(getData))
    showInfo()
}


form.addEventListener('submit'  , (e)=> {
    e.preventDefault()

    const information ={
         picture: imgInput.src == undefined ? "assert/image/user.png" : imgInput.src,
         employeeName : username.value,
         employeeAge : age.value,
         employeeCity: city.value,
         employeeEmail : email.value,
         employeePhone : phone.value,
         employeePost : post.value,
         startDate : sDate.value
        }
        
    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML =  "File The Form"

    showInfo()    

    form.reset()

    imgInput.src = 'assert/image/user.png'
    modal.style.display = "none"
    document.querySelector(".modal-backdrop").remove()
})