module.exports = function (app) {
  const func = require(`../controllers/${require("path").basename(
    __filename
  )}`)();

  app.get("/devices", func.findAll);

  app.get("/device/:id", func.findOne);

  app.post("/device", func.create);

  app.put("/device/:id", func.update);

  app.delete("/device/:id", func.delete);
};
