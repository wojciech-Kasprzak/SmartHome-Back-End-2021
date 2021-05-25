const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger-doc.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    require("./routes/" + file)(app, io, wss, sequelize);
  });

// listen for requests
server.listen(3000, () => {
  // io.sockets.on("connection", function (socket) {
  //   socket.emit("system", "REST API running!");
  // });
  console.log("Server is listening on port 3000");
});

io.on("connection", (socket) => {
  socket.on("emit_method", (msg) => {
    console.log("message: " + msg);
  });
});

io.on("emit_method", (msg) => {
  console.log("message2: " + msg);
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });
  ws.send("DZIAŁA!!!");
});

// https://kirtikau.medium.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
// https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do
