"use strict";

let mongoose = require("mongoose");
let app = require("./app");
const port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/portafolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Conexion a la base de datos con éxito");
    // se levanta el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
