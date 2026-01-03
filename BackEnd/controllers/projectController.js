import uploadOnCloudinary from "../config/cloudinary.js";
import Project from "../models/projectSchema.js";

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({Projects: projects});
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

export const addNewProject = async (req, res) => {
    try {
        const { title, description, githubLink, liveDemoLink} = req.body;
        if (!title || !description || !githubLink || !liveDemoLink) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let techStack = []
        if(req.body.techStack){
            techStack = JSON.parse(req.body.techStack)
        }

        let projectImageUrl
        if(req.file){
            projectImageUrl = await uploadOnCloudinary(req.file.path);
        }
        const newProject = await Project.create({
            title,
            description,
            techStack,
            githubLink,
            liveDemoLink,
            imageUrl: projectImageUrl
        })
        res.status(201).json({Project: newProject});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, githubLink, liveDemoLink} = req.body;

        const updateFields = {};

        let techStack = []
        if(req.body.techStack){
            techStack = JSON.parse(req.body.techStack)
        }


        if (title?.trim()) {
            updateFields.title = title;
        }

        if (description?.trim()) {
            updateFields.description = description;
        }

        if (techStack.length !== 0) {
            updateFields.techStack = JSON.parse(req.body.techStack);
        }

        if (githubLink?.trim()) {
            updateFields.githubLink = githubLink;
        }

        if (liveDemoLink?.trim()) {
            updateFields.liveDemoLink = liveDemoLink;
        }

        let projectImageUrl
        if (req.file) {
            projectImageUrl = await uploadOnCloudinary(req.file.path);
            updateFields.imageUrl = projectImageUrl;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {$set: updateFields},
            {new: true}
        )
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ Project: updatedProject });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error"});
    }
}

