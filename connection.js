const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "",
  // Your password
  password: "",
  database: "stores_db"
});


module.exports = connection;