"use strict";

let mongoose = require("mongoose");
let schema = mongoose.Schema;

let projectSchema = schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String,
});

module.exports = mongoose.model("project", projectSchema);
