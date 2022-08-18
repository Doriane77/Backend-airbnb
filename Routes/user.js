const express = require("express");
const router = express.Router();

const controller = require("../Controllers/user");
const isAuthenticated = require("../Middlewares/isAuthenticated");

router.get("/users", controller.allUser);
router.get("/user/:id", controller.oneUser);

router.post("/user/update", isAuthenticated, controller.userUpdate);
router.post("/user/delete", isAuthenticated, controller.userDelete);
router.post("/login", controller.login);
router.post("/register", controller.register);

module.exports = router;
