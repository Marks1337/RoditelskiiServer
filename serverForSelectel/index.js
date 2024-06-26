require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "master.21d2cae3-ce77-4c9b-91c9-42d8499a0141.c.dbaas.selcloud.ru",
  port: 6033,
  database: "feedbackform",
  user: "Chester",
  password: "35cEN8xoKI3O",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.post("/form", (req, res) => {
  const { name, question, email, phone_number } = req.body;
  connection.query(
    "INSERT INTO `feedback` (name, question, email, phone_number) VALUES (?, ?, ?, ?)",
    [name, question, email, phone_number],
    (error, results, fields) => {
      if (error) throw error;
    }
  );
});

app.listen(6033, () => {
  console.log(`Server is running on port ${PORT}`);
});
