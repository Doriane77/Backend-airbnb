const db = require("../Config/databaseConfig");
const cloudinary = require("../Config/cloudinaryConfig");
const { unsubscribe } = require("../Routes/user");
const { image } = require("../Config/cloudinaryConfig");

const allRoom = (req, res) => {
  try {
    const title = req.query.title;

    let sort = "";

    let page = 1;
    let limit;

    let maxPrice = 10000;
    let minPrice = 1;

    if (req.query.sort === "price-desc") {
      sort = "DESC";
    }
    if (req.query.sort === "price-asc") {
      sort = "ASC";
    }

    if (Number(req.query.page) > 0) {
      page = Number(req.query.page);
    } else {
      page = 1;
    }
    if (Number(req.query.limit) > 0) {
      limit = Number(req.query.limit);
    } else {
      limit = 20;
    }

    if (Number(req.query.maxPrice) < 10000) {
      maxPrice = Number(req.query.maxPrice);
    }
    if (Number(req.query.minPrice) > 0) {
      minPrice = Number(req.query.minPrice);
    }

    let sql = `Select * FROM room ORDER BY price ${sort} LIMIT ${page},${limit}`;

    if (title || maxPrice || minPrice) {
      if (maxPrice && minPrice && title === undefined) {
        sql = `SELECT * FROM room price WHERE price BETWEEN ${minPrice} AND ${maxPrice} +5  ORDER BY price ${sort} LIMIT ${page},${limit}`;
      }
      if (title) {
        sql = `SELECT * FROM room WHERE (title LIKE '%${title}%' AND price BETWEEN ${minPrice} AND ${maxPrice} +5) ORDER BY price ${sort} LIMIT ${page},${limit}`;
      }
    }

    db.query(sql, async (err, result) => {
      if (err) {
        res.json(err);
      } else {
        let tab = [];
        const resulta = result;

        for (let i = 0; i < resulta.length; i++) {
          const obj = result[i].photo;
          resulta[i].photo = JSON.parse(obj);
        }

        res.json(result);
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

const roomsUser = (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      db.query(`SELECT * FROM room WHERE user=${userId}`, (err, result) => {
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
    } else {
      res.json({ message: "Missing userId " });
    }
  } catch (error) {
    res.josn(error);
  }
};

module.exports = { allRoom, publishRoom, deleteRoom, updateRoom, roomsUser };
