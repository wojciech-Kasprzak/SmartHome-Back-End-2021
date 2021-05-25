module.exports = function (app, io, wss, sequelize) {
  const func = require(`../controllers/${require("path").basename(
    __filename
  )}`)(io, wss, sequelize);

  app.get("/devices", func.getAll);

  app.get("/devices/:id", func.findOne);

  app.post("/devices/create", func.create);

  app.put("/devices/edit/:id", func.update);

  app.delete("/devices/delete/:id", func.delete);

  app.put("/devices/state/:id/:state_id", func.updateStatus);

  app.post("/devices/create/pcb/", func.createPCB);
};