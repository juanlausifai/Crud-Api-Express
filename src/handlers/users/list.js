const database = require("../../database");

// GET /api/users
module.exports = (route) => {
  route.get("/", (req, res) => {
    let filterName = req.query.filterName;

    let users = database.DB;
    if (filterName) {
      users = users.filter((elem) => ((elem.name).toLowerCase()).includes(filterName.toLowerCase()));
    }

    res.json(users);
  });
};
