const loginSubmitForm = async () => {
    let formData = {};
    formData.userName = $('#floatingUserName').val();
    formData.password = $('#floatingPassword').val();
    console.log(formData)
    var logindata = await checkIsValid(formData);
    console.log(logindata)
    if (logindata.statusCode == 200 && logindata.message == "Success"){
        window.location.href = "/admin";
    }
   else{alert('Incorrect Username or Password')}
    
}


const checkIsValid = async (collectionData) => {
    var test  = await $.post('/login/login', collectionData, (response) => {
        console.log(response)
       
        //else{return false;}
    })
    return test;
}
const getUserCount = async () => {
    // var test  =  await $.get('/webutil/count', null, (response) => {
    //     console.log(response)
    // })
    
    // return await test;
}
$(function () {

    $('#loginSubmit').click(() => {
        loginSubmitForm();
    })
    //getProjects();
    var data = getUserCount();
    $('#userCount').text(561)
    console.log(data)
    //$('.modal').modal();
});
let socket = io();
socket.on('Number', (msg) => {
    //console.log('Random number: '+ msg);
});