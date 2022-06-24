const express = require("express");
const router = express.Router();
const db = require("../databaseConfig");

router.post("/room/publish", (req, res) => {
  console.log("poster une offre");
  res.json({ message: "poster une offre" });
});

module.exports = router;
