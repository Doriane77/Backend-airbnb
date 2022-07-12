require("dotenv").config();
const compression = require("compression");
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");

const app = express();
app.use(cors());
app.use(compression());
app.use(formidable());

const userRoutes = require("./Routes/user");
app.use(userRoutes);

const roomRoutes = require("./Routes/room");
app.use(roomRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});
app.listen(3000, () => {
  console.log("Server started");
});
