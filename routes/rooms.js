module.exports = function (app) {
  const func = require(`../controllers/${require("path").basename(
    __filename
  )}`)();

  app.get("/rooms", func.findAll);

  app.get("/room/:id", func.findOne);

  app.post("/room", func.create);

  app.put("/room/:id", func.update);

  app.delete("/room/:id", func.delete);
};
