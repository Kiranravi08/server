const mongoose = require('mongoose');

// MongoDB schema for storing file information
const FileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  folderName: { type: String, required: true },
  sourceLanguage: { type: String, required: true },
}, { timestamps: true });

const File = mongoose.model('File', FileSchema);

module.exports = File;

