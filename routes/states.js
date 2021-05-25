module.exports = function (app) {
  const func = require(`../controllers/${require("path").basename(
    __filename
  )}`)();

  app.get("/states", func.findAll);

  app.get("/states/:id", func.findOne);

  // app.post("/states/create", func.create);

  // app.put("/states/edit/:id", func.update);

  // app.delete("/states/delete/:id", func.delete);
};
