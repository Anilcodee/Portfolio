import Visit from "../models/visitSchema.js";

export const trackVisit = async (req, res, next) => {
    try {
        const ip = req.headers['x-forwarded-for']?.split(",")[0] || req.socket.remoteAddress;

        const userAgent = req.headers['user-agent'] || 'Unknown';

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingVisit = await Visit.findOne({
            ip,
            createdAt: { $gte: today }
        });

        if (!existingVisit) {
            await Visit.create({ ip, userAgent });
        }

    } catch (error) {
        console.error("Error tracking visit:", error);
    }

    next();
}