"use strict";

let express = require("express");
let bodyParser = require("body-parser");
let app = express();

//---- archivos de rutas
let projectRutas = require("./routes/api.routes");

//---- middleware
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: false,
    parameterLimit: 10000,
  })
);
// este middleware convertira todos los datos que reciva en formato json
app.use(bodyParser.json({ limit: "5mb" }));

//---- cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//---- rutas
app.use("/api", projectRutas);

// // // app.get("/", (req, res) => {
// // //   res.status(200).send("<h1>Api Restful</h1>");
// // // });
// // // app.post("/test/:id", (req, res) => {
// // //   console.log(req.body.nombre, req.body.apellidos );
// // //   console.log(req.query.web);
// // //   console.log(req.params.id);
// // //   res.status(200).send({
// // //     message: "Hola mundo desde api restful nodejs",
// // //   });
// // // });

//---- export
module.exports = app;
