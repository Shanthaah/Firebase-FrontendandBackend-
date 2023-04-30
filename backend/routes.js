const express = require('express');
const router = express.Router();
const CustomerReview = require('./models/customer-review');

router.get('/reviews', async (req, res) => {
  try {
    const reviews = await CustomerReview.find();
    res.send(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
