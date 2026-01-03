import Contact from "../models/contactSchema.js";
import Visit from "../models/visitSchema.js";
import Project from "../models/projectSchema.js";

export const getVisitAnalytics = async (req, res) => {
    try {
        const totalVisits = await Visit.countDocuments();
        const recentVisits = await Visit.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select('ip userAgent createdAt -_id');

        res.status(200).json({ totalVisits, recentVisits });
    } catch (error) {
        res.status(500).json({ message: "Error fetching visit analytics" });
    }
}

export const getStats = async (req, res) => {
    try {
        const totalMessages = await Contact.countDocuments()
        const totalProjects = await Project.countDocuments()
        const totalVisits = await Visit.countDocuments()

        res.status(200).json({
            messages: totalMessages,
            projects: totalProjects,
            visits: totalVisits
        })
    } catch (error) {
        res.status(500).json({message: "Failed to fetch stats"})
    }
}