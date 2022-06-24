const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const db = require("../databaseConfig");

// User login
router.post("/login", (req, res) => {
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
});

// Sin_up
router.post("/register", (req, res) => {
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
});

//ALL users
router.get("/users", async (req, res) => {
  try {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) {
        res.json({ message: err });
      } else {
        console.log("result =>", result);
        res.json(result);
      }
    });
  } catch (error) {
    res.json({ message: error });
  }
});

//Updata Profile
router.post("/user/update", (req, res) => {
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
                          //   res.json({ message: "Register succès" });
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
                            //   res.json({ message: "Register succès" });
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
                          //   res.json({ message: "Register succès" });
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
                          //   res.json({ message: "Register succès" });
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
                          //   res.json({ message: "Register succès" });
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
});

//Delete user
router.post("/user/delete", (req, res) => {
  try {
    const id = req.fields.id;

    db.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.json({ message: "Delete succès" });
      }
    });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
