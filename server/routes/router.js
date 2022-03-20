const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
  console.log('inside router GET');
  let queryText = `SELECT * FROM "tasks"
                  ORDER BY "id" ASC;`; 
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

  let values = [newTask.task, 'ASAP', 'Home', false]

  pool.query(queryText, values)
  
    .then(result => {
      res.sendStatus(201);
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
      res.sendStatus(204);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })

}); // end delete

router.put('/:id', (req, res) => {
  let id = req.params.id;
  console.log(req.body, id);
  // res.sendStatus(200);

  queryText = `
      UPDATE "tasks"
      SET "completed" = NOT "completed"
      WHERE "id" = $1;`;

  const values = [id];

  pool.query(queryText, values)
      .then(result => {
          res.sendStatus(200);
      }).catch(err => {
          console.log(err)
          res.sendStatus(500);
      })
});



module.exports = router;