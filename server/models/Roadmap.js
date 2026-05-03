import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  done: Boolean,
});

const skillSchema = new mongoose.Schema({
  name: String,
  tasks: [taskSchema],
});

const roadmapSchema = new mongoose.Schema({
  title: String,
  skills: [skillSchema],
});

export default mongoose.model("Roadmap", roadmapSchema);