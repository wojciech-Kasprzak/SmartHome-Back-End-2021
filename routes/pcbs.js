module.exports = function (app) {
  const func = require(`../controllers/${require("path").basename(
    __filename
  )}`)();

  app.get("/pcbs", func.findAll);

  app.get("/pcbs/:id", func.findOne);

  app.post("/pcbs/create", func.create);

  app.put("/pcbs/edit/:id", func.update);

  app.delete("/pcbs/delete/:id", func.delete);
};
