const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js'); //route to DB

router.get('/', (req, res) => {  //sends query to read current contents of DB
  console.log('inside router GET');
  let queryText = `SELECT * FROM "tasks"
                  ORDER BY "id" ASC;`; 
  pool.query(queryText).then(result => {
    // Sends back the results by row
    res.send(result.rows); //send back to client
  })
    .catch(error => {
      console.log('error getting to DB', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => { //sends query to ADD an item from user input
  let newTask = req.body;
  console.log(`Adding task`, newTask);

  let queryText = `INSERT INTO "tasks" ("task", "priority", "category", "completed")
                   VALUES ($1, $2, $3, $4);`;

  let values = [newTask.task, 'ASAP', 'Home', false]

  pool.query(queryText, values) //sends query to ADD an item from user input
  
    .then(result => {
      res.sendStatus(201); //tells client I DID IT
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  // grab the specific id of the task
  let id = req.params.id;
  console.log('Need to delete:', id);
  

  const queryText = `
        DELETE FROM "tasks"
        WHERE "id" = $1;
    `;
  // Sanitize the data
  values = [id];

  pool.query(queryText, values)
    .then(result => {
      res.sendStatus(204); //tells client I DID IT (actually, 'no content')
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })

});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  console.log(req.body, id);

  queryText = `
      UPDATE "tasks"
      SET "completed" = NOT "completed"
      WHERE "id" = $1;`;

  const values = [id];

  pool.query(queryText, values) //sends query to UPDATE an item's "completed" value to true
      .then(result => {
          res.sendStatus(200); //says I DID IT
      }).catch(err => {
          console.log(err)
          res.sendStatus(500);
      })
});



module.exports = router;