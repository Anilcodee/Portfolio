import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
    ip: {
        type: String,
    },
    userAgent: {
        type: String,
    }
}, { timestamps: true })

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;