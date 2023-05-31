require('dotenv').config();
const MongoClient = require('mongodb').MongoClient
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

exports.getUserCount = async function () {
    try {
        var dbConnection = await dbclient.connect();
        var db = await dbConnection.db('contacts');
        var myquery = { website: 111 };
        var newvalues = { $inc: {visit: 1 } };
        var collecationData = await db.collection('uservisit').updateOne(myquery,newvalues);
        console.log(collecationData)
        var collecationDatass = await db.collection('uservisit').find(myquery).toArray();
        console.log(collecationDatass)
        return collecationDatass
    } catch (error) {
        console.log(error)
    }

}



