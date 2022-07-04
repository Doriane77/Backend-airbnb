const db = require("../Config/databaseConfig");
const cloudinary = require("../Config/cloudinaryConfig");

const allRoom = (req, res) => {
  try {
    db.query("SELECT * FROM room", (err, result) => {
      if (err) {
        res.json(err);
      } else {
        const resulta = result;
        for (let i = 0; i < resulta.length; i++) {
          const obj = result[i].photo;
          resulta[i].photo = JSON.parse(obj);
        }
        res.json(resulta);
      }
    });
  } catch (error) {
    res.json({ message: error });
  }
};

const publishRoom = async (req, res) => {
  try {
    const { title, description, price, lat, lng, userId } = req.fields;

    const photo = req.files.photo.path;

    if (title && description && price && lat && lng && photo) {
      const picture = await cloudinary.uploader.upload(photo, {
        folder: `/Airbnb/rooms/`,
      });

      const convertPicture = JSON.stringify(picture);
      db.query(
        `INSERT INTO room SET title="${title}", description="${description}", price="${price}", lat="${lat}", lng="${lng}", user="${userId}", photo='${convertPicture}'`,
        (err, result) => {
          if (err) {
            res.json(err);
          } else {
            console.log("result :", result);
            console.log("INSERT OK");

            db.query(
              `SELECT id,title,description,price,lat,lng,photo,user FROM room WHERE title="${title}"`,
              async (err, result) => {
                if (err) {
                  res.json(err);
                } else {
                  const resulta = result;
                  const obj = result[0].photo;
                  resulta[0].photo = JSON.parse(obj);
                  res.json(resulta);
                }
              }
            );
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

const deleteRoom = (req, res) => {
  try {
    const room = req.fields.room;
    console.log("supprimer ,", room);
    res.json({ message: "Room supprimer." });
  } catch (error) {
    res.json(error);
  }
};
module.exports = { allRoom, publishRoom, deleteRoom };
