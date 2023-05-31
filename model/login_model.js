const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

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

exports.getUser = async function (userName) {
    try {
        console.log(process.env.NODE_ENV)
        console.log(userName)
        var dbConnection = await dbclient.connect();
        var db = await dbConnection.db('contacts');
        var collecationData = await db.collection('user').find({username:userName}).toArray();
        console.log(collecationData)
        return collecationData
    } catch (error) {
        console.log(error)
    }

}
/*add comments here*/
exports.appendCount = async function () {
    try {
        console.log(55)
        var dbConnection = await dbclient.connect();
        var db = await dbConnection.db('contacts');
        var myquery = { website: 111 };
        var newvalues = { $inc: {visit: -1 } };
        var collecationData = await db.collection('uservisit').updateOne(myquery,newvalues);
        console.log(collecationData)
        var collecationDatass = await db.collection('uservisit').find({}).toArray();
        console.log(collecationDatass)
        return collecationDatass
    } catch (error) {
        console.log(error)
    }

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


