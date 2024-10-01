// F:\server\models\DocumentAssignment.js
const mongoose = require('mongoose');

const documentAssignmentSchema = new mongoose.Schema({
    team: {
        type: String,
        required: true,
    },
    targetLanguage: {
        type: [String],
        required: true,
    },
    targetDate: {
        type: Date,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
    assignedToTeamLead: {
        type: String,
        required: true,
    },
    assignedToUsers: {
        type: [String],
        required: true,
    },
    assignedDocument: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('DocumentAssignment', documentAssignmentSchema);
