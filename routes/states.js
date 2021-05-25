module.exports = function (app) {
  const func = require(`../controllers/${require("path").basename(
    __filename
  )}`)();

  app.get("/states", func.findAll);

  app.get("/state/:id", func.findOne);

  app.post("/state", func.create);

  app.put("/state/:id", func.update);

  app.delete("/state/:id", func.delete);
};
