// import controller from ("../Controllers/room")
// export defaut { allRoom};

const express = require("express");
const router = express.Router();

const isAuthenticated = require("../Middlewares/isAuthenticated");
const controller = require("../Controllers/room");

router.get("/rooms", controller.allRoom);
router.post("/room/publish", isAuthenticated, controller.publishRoom);
router.post("/room/delete", isAuthenticated, controller.deleteRoom);
router.post("/room/update", isAuthenticated, controller.updateRoom);

module.exports = router;
