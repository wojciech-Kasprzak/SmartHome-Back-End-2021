module.exports = function (io, sequelize) {
  // const Polls = require("../models/polls.model.js")(sequelize);

  const models = require("../models/index.js");
  // const helpers = require("../helpers/index.js");

  // console.log(models.Owners);
  // console.log(models);

  var controllers = {};
  // const _io = io;

  controllers.findAll = (req, res) => {
    models.Devices.findAll({
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
          message: err.message || "Could not download Devices lists.",
        });
      });
  };

  controllers.findOne = (req, res) => {
    models.Devices.findByPk(req.params.id, {
      include: [
        {
          model: models.Rooms,
        },
        {
          model: models.States,
        },
      ],
    })
      .then((data) => {
        res.send(data.get());
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Device.",
        });
      });
  };

  controllers.create = (req, res) => {
    models.Devices.create(req.body)
      .then(function (data) {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not create Device.",
        });
      });
  };

  controllers.update = (req, res) => {
    models.Devices.update(req.body, {
      where: { id: req.params.id },
    })
      .then(function (data) {
        res.send({ message: "Device was updated successfully!" });
      })
      .catch(function (err) {
        res.status(500).send({
          message: err.message || "Could not update Device.",
        });
      });
  };

  controllers.delete = (req, res) => {
    models.Devices.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.send({ message: "Device was deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete Device with id " + req.params.id,
        });
      });
  };

  return controllers;
};
