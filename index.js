const express = require('express');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId;
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');
const app = express();
const port = 3000;

const loggingWinston = new LoggingWinston();

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    loggingWinston,
  ],
});
// Set the view engine
app.set('view engine', 'ejs');

// MongoDB Connection URI
//const uri = "mongodb+srv://dbuser666:sit725DataUser@cluster0.q6kyg.mongodb.net/?retryWrites=true&w=majority";  --dev db
const uri = 'mongodb://mongo-0.mongo:27017,mongo-1.mongo:27017,mongo-2.mongo:27017/?replicaSet=rs0';   //-- prod db
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Login route
app.get('/', async(req, res) => {
  //res.sendFile(__dirname + '/public/contacts.ejs');
  try {
    await client.connect();
    const db = client.db('contacts');
    logger.info('Connected to Database');
    const collectionData = await db.collection('users').find({}).toArray();
    res.render('contacts', { contacts: collectionData });
  } catch (error) {
    logger.error('Error fetching contacts:', error);
    console.error('Error fetching contacts:', error);
    res.sendStatus(500);
  }
});

// Post route for handling login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials are correct
  if (username === 'admin' && password === 'password') {
    // Redirect to the contacts page upon successful login
    logger.log('Sucessful Login');
    res.redirect('/contacts');
  } else {
    logger.error('Invalid credentials. Please try again.');
    res.send('Invalid credentials. Please try again.');
  }
});

// Contacts listing page
app.get('/contacts', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('contacts');
    const collectionData = await db.collection('users').find({}).toArray();
    res.render('contacts', { contacts: collectionData });
  } catch (error) {
    logger.error('Error fetching contacts:', error);
    console.error('Error fetching contacts:', error);
    res.sendStatus(500);
  }
});

app.get('/contacts/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('contacts');
    const collectionData = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
    console.log(collectionData)
    res.json({ statusCode: 200, data: collectionData, message: 'Contact got successfully!' });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.sendStatus(500);
  }
});


// Add contact route
app.post('/contacts', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('contacts');
    console.log(req.body._id)
    if (req.body._id) {
      console.log("IN")
      var uid = req.body._id;
      var name = req.body.name;
      var email = req.body.email;
      var mobile = req.body.mobile
      await db.collection('users').updateOne(
        { _id: new ObjectId(uid) }, // Filter based on _id field
        { $set: { name, email, mobile } } // Set the new values for name, email, and mobile fields
      );
      await res.json({ statusCode: 200, data: saveResult, message: 'Contact Updated successfully!' })
    } else {
      console.log("OUT")
      delete req.body._id;
      var saveResult = await db.collection('users').insertOne(req.body);
      // res.status(200).json({ message: 'Contact added successfully!' });
      await res.json({ statusCode: 200, data: saveResult, message: 'Contact added successfully!' })
    }
   
  } catch (error) {
    console.error('Error adding contact:', error);
    res.sendStatus(500);
  }
});


// Delete contact route
app.post('/contacts/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await client.connect();
    const db = client.db('contacts');
    var o_id = new ObjectId(id);
    var myquery = { _id: o_id };
    var collection = db.collection('users');
    await collection.deleteOne(myquery, function (err, res) {
      if (err) throw err;
      console.log("1 document Deleted");

    });

    //res.json({ success: id })
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.sendStatus(500);
  }
});

// Edit contact route
app.put('/contacts/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('contacts');
    console.log(req.body)
    await db.collection('users').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
