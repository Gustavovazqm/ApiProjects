"use strict";

let Projects = require("../models/project.model");
let fs = require("fs");

const controller = {
  home(req, res) {
    return res.status(200).send({
      menssage: "Bienvenidos a la api",
    });
  },
  saveProject(req, res) {
    let project = new Projects();
    let params = req.body;

    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    project.save((error, data) => {
      if (error) return res.status(500).send({ menssage: "error al guardar" });
      if (!data) {
        return res
          .status(404)
          .send({ menssage: "No se pudo guardar la información" });
      }

      return res.status(200).send({ project: data });
    });
  },
  getProjectById(req, res) {
    let idProject = req.params.id;
    Projects.findById(idProject, (error, data) => {
      if (error)
        return res
          .status(500)
          .send({ menssage: "Error al devolver los datos" });
      if (!data) {
        return res.status(404).send({ menssage: "No se encontro el projecto" });
      }

      return res.status(200).send({ project: data });
    });
  },
  getListProjects(req, res) {
    Projects.find({})
      .sort("-year")
      .exec((error, dataProjects) => {
        if (error) return res.status(500).send({ error });
        if (!dataProjects) return res.status(404).send({ error: dataProjects });

        return res.status(200).send({ projects: dataProjects });
      });
  },
  updateProject(req, res) {
    let idProject = req.params.id;
    let newParams = req.body;

    Projects.findByIdAndUpdate(
      idProject,
      newParams,
      { new: true },
      (error, data) => {
        if (error) return res.status(500).send({ error });
        if (!data) return res.status(404).send({ error: data });

        return res.status(200).send({ projects: data });
      }
    );
  },
  deleteProject(req, res) {
    let projectId = req.params.id;

    Projects.findByIdAndRemove(projectId, (error, deleted) => {
      if (error)
        return res
          .status(500)
          .send({ menssage: "No se ha podido eliminar el proyecto" });

      if (!deleted)
        return res
          .status(404)
          .send({ menssage: "No se puede eliminar el projecto" });

      return res.status(200).send({ project: deleted });
    });
  },
  uploadImage(req, res) {
    let projectId = req.params.id;
    let fileName = "No subida";

    if (req.files) {
      let filePath = req.files.image.path;
      let filesplit = filePath.split("\\");
      fileName = filesplit[1];

      let extSplit = fileName.split(".");
      let fileExtension = extSplit[1];
      let fileExtName = fileExtension.toLowerCase();

      if (
        fileExtName === "png" ||
        fileExtName === "jpg" ||
        fileExtName === "jpeg" ||
        fileExtName === "gif"
      ) {
        Projects.findByIdAndUpdate(
          projectId,
          { image: fileName },
          { new: true },
          (err, projectUpdated) => {
            if (err) {
              return res
                .status(500)
                .send({ menssage: "No se ha podido eliminar el proyecto" });
            }

            if (!projectUpdated) {
              return res
                .status(404)
                .send({ menssage: "No se puede eliminar el projecto" });
            }

            return res.status(200).send({ file: projectUpdated, fileName });
          }
        );
      } else {
        fs.unlink(filePath, (error) => {
          return res
            .status(200)
            .send({ menssage: "La extension no es valida!" });
        });
      }
    } else {
      return res.status(200).send({ file: fileName });
    }
  },
};

module.exports = controller;
