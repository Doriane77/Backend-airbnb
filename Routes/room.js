// import controller from ("../Controllers/room")
// export defaut { allRoom};

const express = require("express");
const router = express.Router();

const isAuthenticated = require("../Middlewares/isAuthenticated");
const controller = require("../Controllers/room");

router.get("/room/:id", controller.oneRoom);
router.get("/rooms", controller.allRoom);
router.get("/rooms/arround", controller.roomAround);
router.get("/rooms/user/:id", controller.roomsUser);
router.post("/room/publish", isAuthenticated, controller.publishRoom);
router.post("/room/delete", isAuthenticated, controller.deleteRoom);
router.post("/room/update", isAuthenticated, controller.updateRoom);

module.exports = router;
