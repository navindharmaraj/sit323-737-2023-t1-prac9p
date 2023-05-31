require('dotenv').config();
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId; 


const devDbUri = process.env.DEV_DB_URI;
const prodDbUri = process.env.PROD_DB_URI;

let uri;
if (process.env.NODE_ENV === 'production') {
  uri = process.env.DB_URI || prodDbUri;
} else {
  uri = process.env.DB_URI || devDbUri;
}
const dbclient = new MongoClient(uri, { useNewUrlParser: true });

exports.addCollection = async function (collectionName, dataObj) {

    var dbConnection = await dbclient.connect();
    var db = await dbConnection.db('contacts');
    return await db.collection(collectionName).insertOne(dataObj)
   
}

exports.getUser = async function () {
    try {
        var dbConnection = await dbclient.connect();
        var db = await dbConnection.db('contacts');
        var collecationData = await db.collection('users').find({}).toArray();
        return collecationData
    } catch (error) {
        console.log(error)
    }

}
exports.getUserByID = async function (uid) {
    try {
        var dbConnection = await dbclient.connect();
        var db = await dbConnection.db('contacts');
        var o_id = new ObjectId(uid);
        var userData = await db.collection('users').find({_id:o_id}).toArray();
        console.log(userData);
        return userData
    } catch (error) {
        console.log(error)
    }

}
exports.addUser = async function (dataObj) {

    // console.log('Hello');
    // console.log(dataObj);
    var dbConnection = await dbclient.connect();
    var db = await dbConnection.db('contacts');
    return await db.collection('users').insertOne(dataObj)
}
exports.editUsers = async function (dataObj) {

//   console.log(55)
//   console.log(dataObj)
    var dbConnection = await dbclient.connect();
    var db = await dbConnection.db('contacts');
    var o_id = new ObjectId(dataObj._id);
    var myquery = { _id:o_id};
    var newvalues = { $set: {name: dataObj.name, email:  dataObj.email,mobile: dataObj.mobile } };
    db.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      
    });
    
}
exports.deleteUsers = async function (dataObj) {

  console.log(66)
  console.log(dataObj)
    var dbConnection = await dbclient.connect();
    var db = await dbConnection.db('contacts');
    var o_id = new ObjectId(dataObj);
    var myquery = { _id:o_id};
    db.collection("users").deleteOne(myquery, function(err, res) {
      if (err) throw err;
      console.log("1 document Deleted");
      
    });
    
}


exports.testConnection = async function (collectionName){
    console.log(collectionName)
    client.connect((err,db)=>{
        projectCollection = client.db().collection(collectionName);
        if(!err){
            console.log('Mongo DB COnnected');

        }
        else{
            console.log("DB Error : ", err);
            process.exit(1)
        }
    });
}

