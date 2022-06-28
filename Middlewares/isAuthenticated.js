const db = require("../databaseConfig");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const userId = req.fields.userId;
    db.query(
      `SELECT id,email,username,name,description FROM users WHERE token ="${token}"`,
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          if (result.length >= 1) {
            if (userId === result[0].id.toString()) {
              return next();
            } else {
              res.json({ message: "Token or ID invalide" });
            }
          } else {
            res.json({ message: "Token or ID invalide" });
          }
        }
      }
    );
  } catch (error) {
    res.json({ message: error });
  }
};
module.exports = isAuthenticated;
