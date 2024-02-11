const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('./db');

// Route to get total number of students
router.get('/totalStudents', (req, res) => {
  connection.query('SELECT COUNT(*) AS totalStudents FROM students', (error, results) => {
    if (error) {
      console.error('Error retrieving total students: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ totalStudents: results[0].totalStudents });
  });
});

// Route to get total number of events
router.get('/totalEvents', (req, res) => {
  connection.query('SELECT COUNT(*) AS totalEvents FROM events', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving total events: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ totalEvents: results[0].totalEvents });
  });
});

// Route to get total number of volunteers
router.get('/totalVolunteers', (req, res) => {
  connection.query('SELECT COUNT(*) AS totalVolunteers FROM volunteers', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving total volunteers: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ totalVolunteers: results[0].totalVolunteers });
  });
});

// Route to get total sum of transactions
router.get('/totalTransactions', (req, res) => {
  connection.query('SELECT SUM(amount) AS totalTransactions FROM transaction_history', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving total transactions: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ totalTransactions: results[0].totalTransactions });
  });
});

module.exports = router;