const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const db = require("../Config/databaseConfig");
const cloudinary = require("../Config/cloudinaryConfig");

const login = (req, res) => {
  try {
    const { email, password } = req.fields;

    if (email && password) {
      db.query(`SELECT * FROM users WHERE email="${email}" `, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          if (result.length === 1) {
            const hash = SHA256(password + result[0].salt).toString(encBase64);

            if (result[0].hash === hash) {
              db.query(
                `SELECT id,email,username,name,description,token FROM users WHERE email = "${email}"`,
                (err, result) => {
                  if (err) {
                    res.json(err);
                  } else {
                    res.json(result);
                  }
                }
              );
            } else {
              res.json({ message: "Email or password incorrect" });
            }
          } else {
            res.json({ message: "Email or password incorrect" });
          }
        }
      });
    } else {
      res.json({ message: "Missing fields" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};
const register = (req, res) => {
  try {
    const { email, password, username, name, description } = req.fields;

    if (email && password && username && name && description) {
      db.query(`SELECT email, username FROM users`, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          const tabEmail = result.map((el) => el.email);
          const tabUsername = result.map((el) => el.username);

          if (!tabEmail.includes(email) && !tabUsername.includes(username)) {
            const salt = uid2(16);
            const hash = SHA256(password + salt).toString(encBase64);
            const token = uid2(16);
            db.query(
              "INSERT INTO users (email,username,name,description,token,hash,salt ) VALUES (?,?,?,?,?,?,?)",
              [email, username, name, description, token, hash, salt],
              (err, result) => {
                if (err) {
                  res.json({ message: err });
                } else {
                  db.query(
                    `SELECT id,email,username,name,description,token FROM users WHERE email = "${email}"`,
                    (err, result) => {
                      if (err) {
                        res.json(err);
                      } else {
                        res.json(result);
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.json({ message: "Email or Username already exists" });
          }
        }
      });
    } else {
      res.json({ message: "Missing fields" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};
const allUser = (req, res) => {
  try {
    db.query(
      "SELECT id,email,username,name,description,token FROM users",
      (err, result) => {
        if (err) {
          res.json({ message: err });
        } else {
          res.json(result);
        }
      }
    );
  } catch (error) {
    res.json({ message: error });
  }
};
const userUpdate = (req, res) => {
  try {
    const { id, email, password, username, name, description } = req.fields;

    if (id) {
      db.query(`SELECT email,username FROM users`, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          const tabEmail = result.map((el) => el.email);
          const tabUsername = result.map((el) => el.username);

          if (tabEmail.includes(email) || tabUsername.includes(username)) {
            res.json({ message: "Email or Username already used" });
          } else {
            db.query(
              `SELECT * FROM users WHERE id = "${id}"`,
              (err, result) => {
                if (err) {
                  res.json(err);
                } else {
                  if (email) {
                    db.query(
                      `UPDATE users SET email="${email}"  WHERE id="${id}"`,
                      (err, result) => {
                        if (err) {
                          res.json({ message: err });
                        } else {
                          console.log("email update");
                        }
                      }
                    );
                  }
                  if (password) {
                    const hash = SHA256(password + result[0].salt).toString(
                      encBase64
                    );
                    if (result[0].hash !== hash) {
                      db.query(
                        `UPDATE users SET hash="${hash}" WHERE id="${id}"`,
                        (err, result) => {
                          if (err) {
                            res.json({ message: err });
                          } else {
                            console.log("password update");
                          }
                        }
                      );
                    }
                  }
                  if (username) {
                    db.query(
                      `UPDATE users SET  username="${username}" WHERE id="${id}"`,
                      (err, result) => {
                        if (err) {
                          res.json(err);
                        } else {
                          console.log("username update");
                        }
                      }
                    );
                  }
                  if (name) {
                    db.query(
                      `UPDATE users SET name="${name}" WHERE id="${id}"`,
                      (err, result) => {
                        if (err) {
                          res.json({ message: err });
                        } else {
                          console.log("name update");
                        }
                      }
                    );
                  }
                  if (description) {
                    db.query(
                      `UPDATE users SET description="${description}" WHERE id="${id}"`,
                      (err, result) => {
                        if (err) {
                          res.json({ message: err });
                        } else {
                          console.log("description update");
                        }
                      }
                    );
                  }
                  res.json({ message: "Update succès" });
                }
              }
            );
          }
        }
      });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

const userDelete = (req, res) => {
  try {
    const userId = req.fields.userId;

    db.query(
      `SELECT * FROM room WHERE user="${userId}"`,
      async (err, result) => {
        if (err) {
          res.json(err);
        } else {
          for (let i = 0; i < result.length; i++) {
            const obj = result[i].photo;
            const resulta = JSON.parse(obj);
            const pictureId = resulta.public_id;

            const deletePicture = await cloudinary.uploader.destroy(pictureId);

            if (deletePicture.result === "ok") {
              db.query(
                `DELETE FROM room WHERE id=${result[i].id}`,
                (err, result) => {
                  if (err) {
                    res.json(err);
                  } else {
                    db.query(
                      `DELETE FROM users WHERE id ="${userId}"`,
                      (err, result) => {
                        if (err) {
                          res.json({ message: err });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.json({ message: "Error for delete image" });
            }
          }
          res.json({ message: "Delete succès" });
        }
      }
    );
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = { login, register, allUser, userUpdate, userDelete };
