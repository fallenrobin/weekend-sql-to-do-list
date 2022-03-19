const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
  console.log('inside router GET');
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

router.post('/', (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);

  // let queryText = `INSERT INTO "tasks" ("name", "gender", "age", "ready_to_transfer", "notes")
  //                    VALUES ($1, $2, $3, $4, $5);`;
  // pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
  //   .then(result => {
  //     res.sendStatus(201);
  //   })
  //   .catch(error => {
  //     console.log(`Error adding new koala`, error);
  //     res.sendStatus(500);
  //   });
});







module.exports = router;