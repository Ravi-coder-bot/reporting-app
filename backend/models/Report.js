const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
    status: { type: String, enum: ['Pending', 'Under Review', 'Resolved'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
