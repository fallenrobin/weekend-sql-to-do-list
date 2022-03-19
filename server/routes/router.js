const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    console.log( 'inside router GET');
    let queryText = 'SELECT * FROM "tasks";'; // double quotes or not
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting to DB', error);
      res.sendStatus(500);
    });
  });







module.exports = router;