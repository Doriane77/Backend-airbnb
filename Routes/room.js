const express = require("express");
const router = express.Router();
const db = require("../databaseConfig");
const isAuthenticated = require("../Middlewares/isAuthenticated");

router.get("/rooms", (req, res) => {
  try {
    db.query("SELECT * FROM room", (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/room/publish", isAuthenticated, (req, res) => {
  try {
    const { title, description, price, lat, lng, userId } = req.fields;
    const photo = req.files;
    console.log(
      "title :",
      title,
      "description :",
      description,
      "price :",
      price,
      "lat :",
      lat,
      "lng :",
      lng
      // "Photo : ",
      // photo
    );
    console.log("PHOTO ====>", photo.File);
    if (title && description && price && lat && lng && photo) {
      console.log("poster une offre");
      db.query(
        `INSERT INTO room SET title="${title}", description="${description}",price="${price}",lat="${lat}",lng="${lng},user="${userId}"`,
        (err, result) => {
          if (err) {
            res.json(err);
          } else {
            console.log(result);
            // db.query(`INSERT INTO room (photo) VALUES(LOAD_FILE("${photo}"))`);
            res.json({ message: "poster une offre" });
          }
        }
      );
    } else {
      res.json({ message: "Missing fields" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
