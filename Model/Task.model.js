const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["Todo", "Doing", "Done"], default: "Todo" },
  subtask: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }],
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = { TaskModel };
