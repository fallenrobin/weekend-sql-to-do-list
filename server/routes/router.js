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

  let queryText = `INSERT INTO "tasks" ("task", "priority", "category", "completed")
                   VALUES ($1, $2, $3, $4);`;
  pool.query(queryText, [newTask.task, 'high', 'home', false])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});







module.exports = router;