const db = require("../Config/databaseConfig");
const cloudinary = require("../Config/cloudinaryConfig");

const allRoom = (req, res) => {
  try {
    db.query("SELECT * FROM room", (err, result) => {
      if (err) {
        res.json(err);
      } else {
        console.log(result);
        const resulta = result;
        const tab = result[0].photo;
        resulta[0].photo = Buffer.from(tab);
        // console.log("RESULTA :", resulta[0].photo.toJSON());

        // console.log("result :", result[0].photo.toJSON());
        console.log(resulta);
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
    const photo = req.files.photo.path;

    console.log("PHOTO ====>", photo);

    const picture = await cloudinary.uploader.upload(photo, {
      folder: `/Airbnb/rooms/`,
    });
    console.log("type de picture :", typeof picture);

    if (title && description && price && lat && lng && photo) {
      console.log("VALIDER");

      db.query(
        `INSERT INTO room SET title="${title}", description="${description}", price="${price}", lat="${lat}", lng="${lng}", user="${userId}", photo="${picture}"`,
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
                  console.log("SELECT OK");
                  console.log("result :", result);

                  res.json(result);

                  /*  const picture = await cloudinary.uploader.upload(photo, {
                    folder: `/Airbnb/rooms/${result.id}`,
                  });
                  console.log(picture);
                  db.query(
                    `UPDATE room SET photo=${picture} WHERE id=${result.id} `,
                    (err, result) => {
                      if (err) {
                        res.json(err);
                      } else {
                        db.query(
                          `SELECT id,title,description,price,lat,lng,photo,user FROM room WHERE id=${id}"`,
                          (err, result) => {
                            res.json(result);
                          }
                        );
                      }
                    }
                  );
                  res.json({ message: result });*/
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
