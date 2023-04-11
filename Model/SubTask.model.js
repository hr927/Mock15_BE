const mongoose = require("mongoose");

const subTaskSchema = mongoose.Schema({
  title: String,
  isCompleted: Boolean,
});

const SubTaskModel = mongoose.model("Subtask", subTaskSchema);

module.exports = { SubTaskModel };
