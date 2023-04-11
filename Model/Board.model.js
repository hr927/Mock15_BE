const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  userID: String,
  name: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const BoardModel = mongoose.model("board", boardSchema);

module.exports = { BoardModel };
