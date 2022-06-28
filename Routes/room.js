const express = require("express");
const router = express.Router();
const db = require("../databaseConfig");
const isAuthenticated = require("../Middlewares/isAuthenticated");

router.get("/rooms", isAuthenticated, (req, res) => {
  try {
    console.log(req.fields);
    res.json({ message: "rooms" });
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/room/publish", isAuthenticated, (req, res) => {
  try {
    const { title, description, price, lat, lng, photo, user } = req.fields;
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
      lng,
      "photo :",
      photo,
      "user :",
      user
    );
    console.log("poster une offre");
    res.json({ message: "poster une offre" });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
