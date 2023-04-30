const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const admin = require('./config.js');

const admin = require("firebase-admin");

const serviceAccount = require("./ssdf-76ab6-firebase-adminsdk-q3zrk-8a07d2d405.json");
dbUrl = "https://console.firebase.google.com/project/ssdf-76ab6/firestore/data/~2F"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Handle preflight OPTIONS request
app.options('/api/customer-review', (req, res) => {
  res.status(200).send();
});

// Define the endpoint to receive customer review data
app.post('/api/customer-review', (req, res) => {
  const data = req.body;

  // Save the data to a Firebase database collection
  //const db = admin.firestore();
  db.collection('customer-reviews').add(data)
    .then((docRef) => {
      console.log(`Document written with ID: ${docRef.id}`);
      res.status(200).send('Review submitted successfully!');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      res.status(500).send('Error adding document!');
    });
});

//kapil.kushwaha@subhanu.com

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
