const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "tuto",
});
// database: "airbnb",
db.connect(function (err) {
  if (err) throw err;
  console.log("Vous êtes bien connecter à la base de données MySQL !");
});

module.exports = db;
