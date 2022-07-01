// import controller from ("../Controllers/room")
// export defaut { allRoom};

const express = require("express");
const router = express.Router();
const db = require("../Config/databaseConfig");
const isAuthenticated = require("../Middlewares/isAuthenticated");

const controller = require("../Controllers/room");

router.get("/rooms", controller.allRoom);
router.post("/room/publish", isAuthenticated, controller.publishRoom);

module.exports = router;
