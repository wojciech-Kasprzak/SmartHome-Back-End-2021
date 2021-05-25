module.exports = function (io, sequelize) {
  // const Polls = require("../models/polls.model.js")(sequelize);

  const models = require("../models/index.js");
  // const helpers = require("../helpers/index.js");

  // console.log(models.Owners);
  // console.log(models);

  var controllers = {};
  // const _io = io;

  controllers.findAll = (req, res) => {
    models.PCBs.findAll({
      include: [
        {
          model: models.Transmitters,
          include: [
            {
              model: models.States,
            },
            {
              model: models.Rooms,
            },
          ],
        },
      ],
      // order: [["id", "DESC"]],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not download Rooms lists.",
        });
      });
  };

  controllers.findOne = (req, res) => {
    models.PCBs.findByPk(req.params.id, {
      include: [
        {
          model: models.Transmitters,
          include: [
            {
              model: models.States,
            },
            {
              model: models.Rooms,
            },
          ],
        },
      ],
    })
      .then((data) => {
        res.send(data.get());
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Room.",
        });
      });
  };

  controllers.create = (req, res) => {
    models.PCBs.create(req.body)
      .then(function (data) {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not create Room.",
        });
      });
  };

  controllers.update = (req, res) => {
    models.PCBs.update(req.body, {
      where: { id: req.params.id },
    })
      .then(function (data) {
        res.send({ message: "Room was updated successfully!" });
      })
      .catch(function (err) {
        res.status(500).send({
          message: err.message || "Could not update Room.",
        });
      });
  };

  controllers.delete = (req, res) => {
    models.PCBs.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.send({ message: "Room was deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete Room with id " + req.params.id,
        });
      });
  };

  return controllers;
};
