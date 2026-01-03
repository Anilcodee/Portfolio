import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  liveDemoLink: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
