/* Server-side script written in Node.js using the Express.js framework. 
Sets up a simple web server that connects to a MySQL database and serves 
up a single route for fetching data.*/
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a connection to your database
const db = mysql.createConnection({
  host: 'localhost', // replace with your host name
  user: 'root',      // replace with your database username
  password: '',      // replace with your database password
  database: 'mydb'   // replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Define a route to store data
app.post('/store-data', express.json(), (req, res) => {
  const data = req.body;
  let sql = 'INSERT INTO mytable SET ?'; // replace with your SQL query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send('Data stored successfully');
  });
});

// Define a route to fetch data
app.get('/fetch-data', (req, res) => {
  let sql = 'SELECT * FROM mytable'; // replace with your SQL query
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
