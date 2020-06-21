"use strict";
let express = require("express");
let projectController = require("../controller/project.controller");
let multipar = require("connect-multiparty");

let multipartMiddle = multipar({ uploadDir: "./images" });

var ruta = express.Router();

ruta.get("/home", projectController.home);
ruta.post("/save-project", projectController.saveProject);
ruta.get("/projectById/:id", projectController.getProjectById);
ruta.get("/listProjects", projectController.getListProjects);
ruta.put("/updateProject/:id", projectController.updateProject);
ruta.delete("/deleteProject/:id", projectController.deleteProject);
ruta.post("/uploadImage/:id", multipartMiddle, projectController.uploadImage);

module.exports = ruta;
