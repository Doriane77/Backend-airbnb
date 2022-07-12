require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});
// database: "airbnb",
db.connect(function (err) {
  if (err) throw err;
  console.log("Vous êtes bien connecter à la base de données MySQL !");
});

module.exports = db;
