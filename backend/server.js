const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "crud",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (name, email) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(res.json(err));
    }
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "Iupdate student set name = ? email= ? where id = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.log(res.json(err));
    }
    return res.json(data);
  });
});

app.delete("/student/delete/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.log(res.json(err));
    }
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("Server started on port 8081");
});
