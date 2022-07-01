const db = require("../Config/databaseConfig");
const cloudinary = require("cloudinary").v2;

const allRoom = (req, res) => {
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
};

const publishRoom = (req, res) => {
  try {
    const { title, description, price, lat, lng, userId } = req.fields;
    const photo = req.files.photo.path;
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
    );
    console.log("PHOTO ====>", photo);
    if (title && description && price && lat && lng && photo) {
      console.log("poster une offre");

      db.query(
        `INSERT INTO room SET title="${title}", description="${description}", price="${price}", lat="${lat}", lng="${lng}", user="${userId}", photo="${photo}"`,
        (err, result) => {
          if (err) {
            res.json(err);
          } else {
            console.log("result :", result);
            db.query(
              `SELECT id,title,description,price,lat,lng,photo,user FROM room WHERE title="${title}"`,
              (err, result) => {
                if (err) {
                  res.json(err);
                } else {
                  res.json({ message: result });
                }
              }
            );
            // res.json({ message: "poster une offre" });
          }
        }
      );
    } else {
      res.json({ message: "Missing fields" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = { allRoom, publishRoom };
