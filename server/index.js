require('dotenv').config()
const express = require("express");
const mysql = require("mysql2");
const cors = require('cors')
const PORT = process.env.PORT

const app = express();

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.post('/form', (req, res) => {
  const { name, question, email, phone_number} = req.body
  connection.query('INSERT INTO `feedback` (name, question, email, phone_number) VALUES (?, ?, ?, ?)', [name, question, email, phone_number], (error, results, fields) => {
    if (error) throw error
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});