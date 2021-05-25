module.exports = function (app) {
  const func = require(`../controllers/${require("path").basename(
    __filename
  )}`)();

  app.get("/rooms", func.findAll);

  app.get("/rooms/:id", func.findOne);

  app.post("/rooms/create", func.create);

  app.put("/rooms/edit/:id", func.update);

  app.delete("/rooms/delete/:id", func.delete);
};
