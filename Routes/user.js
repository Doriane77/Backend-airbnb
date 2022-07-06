const express = require("express");
const router = express.Router();

const controller = require("../Controllers/user");
const isAuthenticated = require("../Middlewares/isAuthenticated");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/users", controller.allUser);
router.post("/user/update", isAuthenticated, controller.userUpdate);
router.post("/user/delete", isAuthenticated, controller.userDelete);

module.exports = router;
