const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId; 
 //const uri = "mongodb+srv://dbuser666:sit725DataUser@cluster0.q6kyg.mongodb.net/?retryWrites=true&w=majority"; // --dev db
const uri = 'mongodb://mongo-0.mongo:27017,mongo-1.mongo:27017,mongo-2.mongo:27017/?replicaSet=rs0';   //-- prod db
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

