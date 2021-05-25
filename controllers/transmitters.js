module.exports = function (io, wss, sequelize) {
  const models = require("../models/index.js");
  // const helpers = require("../helpers/index.js");

  var controllers = {};
  // const _io = io;

  controllers.getAll = (req, res) => {
    models.Transmitters.findAll({
      include: [
        {
          model: models.Rooms,
        },
        {
          model: models.States,
        },
      ],
      // order: [["id", "DESC"]],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not download Transmitters lists.",
        });
      });
  };

  controllers.findOne = (req, res) => {
    models.Transmitters.findByPk(req.params.id, {
      include: [
        {
          model: models.Rooms,
        },
        {
          model: models.States,
        },
        {
          model: models.PCBs,
        },
      ],
    })
      .then((data) => {
        res.send(data.get());
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Transmitter.",
        });
      });
  };

  controllers.create = async (req, res) => {
    // const result = await isNameUnique(models, req.body.name);
    // if (result == true) {
    models.Transmitters.create(req.body)
      .then(function (data) {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not create Transmitter.",
        });
      });
    // } else {
    //   // zwraca dane urządzenia, które istnieje juz w bazie
    //   res.send(result[0]);
    // }
  };

  controllers.update = (req, res) => {
    models.Transmitters.update(req.body, {
      where: { id: req.params.id },
    })
      .then(function (data) {
        res.send({ message: "Transmitter was updated successfully!" });
      })
      .catch(function (err) {
        res.status(500).send({
          message: err.message || "Could not update Transmitter.",
        });
      });
  };

  controllers.delete = (req, res) => {
    models.Transmitters.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.send({ message: "Transmitter was deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete Transmitter with id " + req.params.id,
        });
      });
  };

  controllers.updateStatus = async (req, res) => {
    let state = await models.States.findByPk(req.params.state_id, {});

    models.Transmitters.update(
      { States_ID: req.params.state_id },
      {
        where: { id: req.params.id },
      }
    )
      .then(function (data) {
        // io.emit("test", { state: 1 });
        // wss.on("connection", (ws) => {
        //   ws.send("TEST");
        // });

        io.emit(req.params.id, {
          state: req.params.state_id,
          name: state.name,
        });
        res.send({ message: "State was updated successfully!" });
      })
      .catch(function (err) {
        res.status(500).send({
          message: err.message || "Could not update Transmitter.",
        });
      });
  };

  controllers.createPCB = async (req, res) => {
    console.log(req.body);
    let pcb = null;
    return sequelize
      .transaction(function (t) {
        return models.PCBs.create(
          { Name: req.body.Name },
          { transaction: t }
        ).then(function (data) {
          pcb = data;
          req.body.transmitters.forEach((elem) => {
            delete elem.transmitter;
            elem.PCBs_ID = data.id;
            elem.Rooms_ID = parseInt(elem.Rooms_ID);
            elem.States_ID = 2;
            elem.GPIO = parseInt(elem.GPIO);
          });
          return models.Transmitters.bulkCreate(req.body.transmitters, {
            transaction: t,
          });
        });
      })
      .then(function (result) {
        req.body.id = pcb.id;
        res.send(req.body);
      })
      .catch(function (err) {
        // console.log(err);
        return res.status(500).send({
          message: "Error",
        });
      });
  };

  return controllers;
};

async function isNameUnique(models, name) {
  // const count = await models.Transmitters.count({ where: { name: name } });
  const result = await models.Transmitters.findAndCountAll({
    where: { name: name },
  });
  if (result.count == 0) {
    return true;
  }
  if (result.count == 1) {
    return result.rows;
  }
}
