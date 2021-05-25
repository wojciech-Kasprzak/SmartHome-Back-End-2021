module.exports = function (io, sequelize) {
  // const Polls = require("../models/polls.model.js")(sequelize);

  const models = require("../models/index.js");
  // const helpers = require("../helpers/index.js");

  // console.log(models.Owners);
  // console.log(models);

  var controllers = {};
  // const _io = io;

  controllers.findAll = (req, res) => {
    models.States.findAll({
      // include: [
      //   {
      //     model: models.Transmitters,
      //     include: [
      //       {
      //         model: models.States,
      //       },
      //       {
      //         model: models.Rooms,
      //       },
      //     ],
      //   },
      // ],
      // order: [["id", "DESC"]],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not download States lists.",
        });
      });
  };

  controllers.findOne = (req, res) => {
    models.States.findByPk(req.params.id, {
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
            {
              model: models.PCBs,
            },
          ],
        },
      ],
    })
      .then((data) => {
        res.send(data.get());
        return data;
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving State.",
        });
      });
  };

  controllers.create = (req, res) => {
    models.States.create(req.body)
      .then(function (data) {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not create State.",
        });
      });
  };

  controllers.update = (req, res) => {
    models.States.update(req.body, {
      where: { id: req.params.id },
    })
      .then(function (data) {
        res.send({ message: "State was updated successfully!" });
      })
      .catch(function (err) {
        res.status(500).send({
          message: err.message || "Could not update State.",
        });
      });
  };

  controllers.delete = (req, res) => {
    models.States.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.send({ message: "State was deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete State with id " + req.params.id,
        });
      });
  };

  return controllers;
};
