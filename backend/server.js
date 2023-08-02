const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const secretKey = "dddfdfdFFFqq11!!6ghd";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "university-apk",
});

app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO registration (`username`, `email`, `password`, `permission`) VALUES (?)";
  const values = [req.body.username, req.body.email, req.body.password, "user"];

  db.query(sql, [values], (err, data) => {
   
    if (err) {
      console.error("Database error: ", err);
      return res
        .status(500)
        .json({ error: "Failed to insert data into the database." });
    }

  
    const userData = {
      username: req.body.username,
      email: req.body.email,
      permission: "user",
    };
    return res.json(userData);
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM registration WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ error: "Failed to fetch user data." });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: "User not found." });
    }

    const user = result[0];
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }


    const userData = {
      username: user.username,
      email: user.email,
      permission: user.permission,
    };
    const token = jwt.sign(userData, secretKey, { expiresIn: "1h" });

    
    const response = {
      ...userData,
      token: token,
    };

    return res.json(response);
  });
});
app.get("/allUsers", (req, res) => {
  const sql = "SELECT * FROM registration";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error: ", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch data from the database." });
    }

    return res.json(data);
  });
});
app.put("/updateUsers/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, password, permission } = req.body;

  const sql =
    "UPDATE registration SET username=?, email=?, password=?, permission=? WHERE id=?";
  const values = [username, email, password, permission, id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error: ", err);
      return res
        .status(500)
        .json({ error: "Failed to update data in the database." });
    }

 
    const updateUsers = {
      id,
      username,
      email,
      password,
      permission,
    };
    return res.json(updateUsers);
  });
});
app.delete("/deleteUsers/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM registration WHERE id=?";
  const values = [id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error: ", err);
      return res
        .status(500)
        .json({ error: "Failed to delete data from the database." });
    }


    return res.json({ message: "Data deleted successfully." });
  });
});

app.post("/formData", (req, res) => {
  const sql =
    "INSERT INTO formular (`name`, `email`, `phone`, `form_name`, `form_status`, `created_at`, `waiting_time`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.form_name,
    "pending",
    mysql.raw("NOW()"),
    null,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error: ", err);
      return res
        .status(500)
        .json({ error: "Failed to insert data into the database." });
    }

  
    const formData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      form_name: req.body.form_name,
      form_status: "pending",
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      waiting_time: null,
    };
    return res.json(formData);
  });
});

app.get("/formData", (req, res) => {
  const sql = "SELECT * FROM formular";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error: ", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch data from the database." });
    }

    return res.json(data);
  });
});

app.put("/updateFormData/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, form_name, form_status, waiting_time } = req.body;


  const sql =
    "UPDATE formular SET name=?, email=?, phone=?, form_name=?, form_status=?, waiting_time=? WHERE id=?";
  const values = [name, email, phone, form_name, form_status, waiting_time, id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error: ", err);
      return res
        .status(500)
        .json({ error: "Failed to update data in the database." });
    }

 
    const updatedData = {
      id,
      name,
      email,
      phone,
      form_name,
      form_status,
      waiting_time,
    };
   
    return res.json(updatedData);
  });
});

app.delete("/deleteFormData/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM formular WHERE id=?";
  const values = [id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error: ", err);
      return res
        .status(500)
        .json({ error: "Failed to delete data from the database." });
    }


    return res.json({ message: "Data deleted successfully." });
  });
});

app.listen(8081, () => {
  console.log("BACKEND - WORKING");
});
