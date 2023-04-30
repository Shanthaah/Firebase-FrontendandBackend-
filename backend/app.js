const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('./config.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Define the endpoint to receive customer review data
app.post('/api/customer-review', (req, res) => {
  const data = req.body;

  // Save the data to a Firebase database collection
  const db = admin.firestore();
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

// Add the middleware to handle CORS preflight requests
app.options('/api/customer-review', cors({ origin: 'http://localhost:4200' }));

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
