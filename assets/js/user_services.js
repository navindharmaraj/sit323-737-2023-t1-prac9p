var myModal;
$(function () {

     myModal = new bootstrap.Modal(document.getElementById('userModal'), {
        keyboard: false
    })
    //$('#loginSubmit').click(() => {
    getAllUser();
    //})
    //getProjects();

    //$('.modal').modal();
    $('#saveUser').click(function () {
        saveUser();
    });
    $(document).on('click', '.uactiondelete', function () {
        var uid = $(this).data('user')
        console.log(uid);
        deleteUserByID(uid);
    });
    $(document).on('click', '.uactionedit', function () {
        var uid = $(this).data('user')
        console.log(uid);
        getUserByID(uid);
    });
});
const deleteUser = async (control) => {
    console.log($(control).data('users'))
}
const getUserByID = async (uid) => {
    var UserData = await $.post('/adminpages/getuserdatabyid', { uid: uid }, (response) => {
        return response;
    })
    if (UserData.data.length >= 1) {
        setUserFormVal(UserData.data[0])
    }
}
const deleteUserByID = async (uid) => {
    console.log('UID:',uid)
    var UserData = await $.post('/adminpages/deleteUsersdata', { uid: uid }, (response) => {
        return response;
        
    })
    getAllUser();
}
const setUserFormVal = async (formdata) => {
    $('#inputName').val(formdata.name);
    $('#inputEmail').val(formdata.email);
    $('#inputMob').val(formdata.mobile);
    $('#userid').val(formdata._id)
    myModal.show();
}
const getAllUser = async () => {
    var UserData = await $.post('/adminpages/getuserdata', {}, (response) => {
        return response
    })
    if (UserData.data.length >= 1) {
        addTableRow(UserData.data);
    }
}
const saveUser = async () => {
    let formData = {};
    var userId = $('#userid').val()
    formData.name = $('#inputName').val();
    formData.email = $('#inputEmail').val();
    formData.mobile = $('#inputMob').val();
    
    if (userId.length > 1) {
        formData._id = userId;
        console.log(formData)
        await $.post('/adminpages/edituserdata', formData, (response) => {
            if (response.statusCode == 200) {
                console.log(999)
                 myModal.hide()
                getAllUser();
            }
        })
    }
    else {
        console.log(formData)
        await $.post('/adminpages/adduserdata', formData, (response) => {
            if (response.statusCode == 200) {
                console.log(999)
                myModal.hide()
                getAllUser();
            }
        })
    }

}


const addTableRow = (items) => {
    $("#incidentrow").empty();
    items.forEach(item => {
        console.log(item);
        let isUser = item.type == 0 ? "User" : "Admin";
        let itemToAppend = '<tr>'
            + '<td><span >' + item._id + '</span></td>'
            + '<td>' + item.name + '</td>'
            + '<td>' + item.email + '</td>'
            + '<td>' + item.mobile + '</td>'
            + '<td><a class="tableAction uactiondelete" data-user=' + item._id + '  data-toggle="tooltip" data-placement="bottom" title="Delete" ><i class="bi-trash"></i></a><a class="tableAction uactionedit"  data-user=' + item._id + ' data-toggle="tooltip" data-placement="bottom" title="Edit" ><i class="bi-pencil-square"></i></a></td>'
            + '</tr>'
        $("#incidentrow").append(itemToAppend)

    });
}