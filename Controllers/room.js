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
    const roomId = req.fields.roomId;
    if (roomId) {
      db.query(
        `SELECT * FROM room WHERE id="${roomId}"`,
        async (err, result) => {
          if (err) {
            res.json(err);
          } else {
            const resulta = result;
            const obj = result[0].photo;
            resulta[0].photo = JSON.parse(obj);
            const pictureId = resulta[0].photo.public_id;

            const picture = await cloudinary.uploader.destroy(pictureId);

            if (picture.result === "ok") {
              db.query(`DELETE FROM room WHERE id=${roomId}`, (err, result) => {
                if (err) {
                  res.json(err);
                } else {
                  console.log(result);
                  res.json({ message: "Room deleted" });
                }
              });
            }
          }
        }
      );
    } else {
      res.json({ message: "Missing roomId" });
    }
  } catch (error) {
    res.json(error);
  }
};

const updateRoom = (req, res) => {
  try {
    const { roomId, title, description, price, lat, lng } = req.fields;
    const photo = req.files.photo.path;

    if (roomId) {
      if (title) {
        db.query(
          `UPDATE room SET title="${title}" WHERE id=${roomId}`,
          (err, result) => {
            if (err) {
              res.json(err);
            } else {
              console.log("title updade");
            }
          }
        );
      }
      if (description) {
        db.query(
          `UPDATE room SET description="${description}" WHERE id=${roomId}`,
          (err, result) => {
            if (err) {
              res.json(err);
            } else {
              console.log("description update");
            }
          }
        );
      }
      if (price) {
        db.query(
          `UPDATE room SET price="${price}" WHERE id=${roomId}`,
          (err, result) => {
            if (err) {
              res.json(err);
            } else {
              console.log("prise update");
            }
          }
        );
      }
      if (lat && lng) {
        db.query(``, (err, result) => {
          if (err) {
            res.json(err);
          } else {
            console.log("lat and lng update");
          }
        });
      }
      if (req.files.photo.name != "") {
        db.query(
          `SELECT * FROM room WHERE id=${roomId}`,
          async (err, result) => {
            if (err) {
              res.json(err);
            } else {
              const obj = result[0].photo;

              const resulta = JSON.parse(obj);

              const pictureId = resulta.public_id;

              const deletePicture = await cloudinary.uploader.destroy(
                pictureId
              );

              if (deletePicture.result === "ok") {
                const picture = await cloudinary.uploader.upload(photo, {
                  folder: `/Airbnb/rooms/`,
                });

                const convertPicture = JSON.stringify(picture);

                db.query(
                  `UPDATE room SET photo='${convertPicture}' WHERE id =${roomId}`,
                  (err, result) => {
                    if (err) {
                      res.json(err);
                    } else {
                      console.log("update photo :", result);
                      console.log("photo update");
                      res.json({ message: "Update room and picture" });
                    }
                  }
                );
              }
            }
          }
        );
      } else {
        res.json({ message: "Update room" });
      }
    } else {
      res.json({ message: "Missing roomId" });
    }
  } catch (error) {
    res.json(error);
  }
};
module.exports = { allRoom, publishRoom, deleteRoom, updateRoom };
