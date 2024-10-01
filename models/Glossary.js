const mongoose = require('mongoose');

const GlossarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileName: {
        type: String, // Field to store the original file name
        required: true,
    },
    languages: {
        type: [String], // Array of selected languages
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Glossary', GlossarySchema);
