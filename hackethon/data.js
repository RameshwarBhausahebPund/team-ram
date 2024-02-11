const express = require("express");
const router = express.Router();
const connection = require("./db");

router.get("/events/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
//   console.log(req);
//   console.log(req);
  connection.query(
    `SELECT * FROM events where org_id = ${id}`,
    (error, results, fields) => {
      if (error) {
        console.error("Error retrieving total events: " + error.stack);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ totalEvents: results });
    }
  );
});

router.post('/VolunteersEmail', (req, res) => {
  connection.query('SELECT email FROM volunteers', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving total volunteers: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ totalVolunteers: results });
  });
});


module.exports = router;
