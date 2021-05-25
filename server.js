const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const server = require("http").Server(app);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

// Configuring the database

const dbConfig = require("./config/config.json");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// fs.readdirSync(__dirname).filter(file => {
//         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(file => {
//         const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//         db[model.name] = model;
//     });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Smart-Lizard.",
  });
});

//  Load routers
let normalizedPath = require("path").join(__dirname, "routes");
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    require("./routes/" + file)(app);
  });

// listen for requests
server.listen(3000, () => {
  // io.sockets.on("connection", function (socket) {
  //   socket.emit("system", "REST API running!");
  // });
  console.log("Server is listening on port 3000");
});
