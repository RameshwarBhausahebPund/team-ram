// authRoutes.js
const express = require('express');
const router = express.Router();
const { loginSchema } = require('./validation');
const connection = require('./db');
const z = require('zod');




// Route for login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Define user types
  const userTypes = ['students', 'organizations', 'volunteers', 'government_bodies'];
  
  // Array to store results from all user type queries
  const results = [];

  // Iterate over each user type and perform login query
  userTypes.forEach((userType, index) => {
    // Perform login query for each user type
    connection.query(`SELECT * FROM ${userType} WHERE email = ? AND password = ?`, [email, password], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      // If login is successful for the current user type, return the user and user type
      if (result.length === 1) {
        results.push({ userType, user: result[0] });
      }
      
      // If login attempts for all user types are completed, send the response
      if (index === userTypes.length - 1) {
        // If no login attempt was successful, return an error
        if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If login attempt was successful, return the user and user type
        return res.status(200).json({ message: 'Login successful', results });
      }
    });
  });
});

// Close MySQL connection when server shuts down
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection: ' + err.stack);
      return;
    }
    console.log('MySQL connection closed');
  });
});




// ---------------------------------------------------------------------------------------------------------------

// Register Organization
router.post('/register/organization', (req, res) => {
  const { name, email, password, phone, address, description } = req.body;
  const orgData = { name, email, password, phone, address, description };

  connection.query('INSERT INTO organizations SET ?', orgData, (error, results) => {
    if (error) {
      console.error('Error registering organization:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    console.log('Organization registered successfully');
    res.status(200).json({ message: 'Organization registered successfully' });
  });
});

// Register Volunteer
router.post('/register/volunteer', (req, res) => {
  const { name, email, password, phone, address, volunteer_expertise } = req.body;
  const volunteerData = { name, email, password, phone, address, volunteer_expertise };

  connection.query('INSERT INTO volunteers SET ?', volunteerData, (error, results) => {
    if (error) {
      console.error('Error registering volunteer:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    console.log('Volunteer registered successfully');
    res.status(200).json({ message: 'Volunteer registered successfully' });
  });
});


module.exports = router;
