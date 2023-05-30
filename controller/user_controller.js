var db = require('../model/customer_model')
exports.dummyfunction = async function (req, res, nxt) {

}
exports.getUsers = async function (req, res, nxt) {
    try {
       
        var getUser = await db.getUser();
        await res.json({ statusCode: 200, data: getUser, message: "Success" })
    } catch (error) {

    }

}
exports.getUserByID = async function (req, res, nxt) {
    try {
       console.log(req.body.uid)
        var getUser = await db.getUserByID(req.body.uid);
        await res.json({ statusCode: 200, data: getUser, message: "Success" })
    } catch (error) {

    }

}

exports.addUsers = async function (req, res, nxt) {
    try {
       console.log(req.body)
       var saveResult = await db.addUser(req.body)
       console.log(saveResult)
       await res.json({ statusCode: 200, data: saveResult, message: "Success" })
       
    } catch (error) {

    }

}
exports.editUsers = async function (req, res, nxt) {
    try {
       console.log(req.body)
       var saveResult = await db.editUsers(req.body)
       console.log(saveResult)
       await res.json({ statusCode: 200, data: saveResult, message: "Success" })
       
    } catch (error) {

    }

}
exports.deleteUsers = async function (req, res, nxt) {
    try {
       console.log(req.body)
       var saveResult = await db.deleteUsers(req.body.uid)
       console.log(5555)
       console.log(saveResult)
       await res.json({ statusCode: 200, data: saveResult, message: "Success" })
       
    } catch (error) {

    }

}
exports.checkIsValidUser = async function (req, res, nxt) {
    try {
        var userName = req.body.userName;
        var password = req.body.password;

        var getUserData = await db.getUser(userName);
        if (getUserData.length == 1) {

            if (getUserData[0].password == password) { await res.json({ statusCode: 200, data: 'colData', message: "Success" }) }
            else {
                await res.json({ statusCode: 200, data: null, message: "Error" })
            }

        }
        else {
            await res.json({ statusCode: 200, data: null, message: "Error" })
        }

    } catch (error) {
        console.log(error)
    }

}