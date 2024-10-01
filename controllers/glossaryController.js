const multer = require('multer');  
const path = require('path');
const fs = require('fs');
const File = require('../models/File');
const Glossary = require('../models/Glossary'); // Assuming you have a Glossary model

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderName = req.body.folderName || 'default'; // Default to 'default'
        const folderPath = path.join(__dirname, '../uploads', folderName);  // Ensure proper path
        
        // Ensure the folder exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

const upload = multer({ storage });

exports.create = [
    upload.single('file'), // Apply multer middleware to handle file upload
    async (req, res) => {
        const { folderName, sourceLanguage } = req.body;
      
        console.log('Received folderName:', folderName); // Debug log
        console.log('Received sourceLanguage:', sourceLanguage); // Debug log
        console.log('File:', req.file); // Log received file
      
        // Validate folderName
        if (!folderName) {
            return res.status(400).json({ error: 'Folder name is required' });
        }
      
        // Validate uploaded file
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
      
        try {
            const uploadedFile = req.file;
      
            // Save file info to the database
            const fileRecord = await File.create({
                fileName: uploadedFile.originalname,
                filePath: uploadedFile.path,
                folderName: folderName,
                sourceLanguage: sourceLanguage,
            });
      
            return res.status(201).json({ 
                message: 'File uploaded successfully!',
                file: {
                    id: fileRecord.id,
                    fileName: uploadedFile.originalname,
                    filePath: uploadedFile.path,
                    folderName: folderName,
                    sourceLanguage: sourceLanguage,
                }
            });
        } catch (error) {
            console.error('Error saving file:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
];

exports.list = async (req, res) => {
    try {
        const files = await File.find({}, 'fileName sourceLanguage targetDate assignedDate uploadBy status comments assignedTeams'); // Only select relevant fields
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        // Find glossary by ID and delete
        const glossary = await Glossary.findByIdAndDelete(id);

        if (!glossary) {
            return res.status(404).json({ message: 'Glossary not found' });
        }

        res.status(200).json({ message: 'Glossary deleted successfully' });
    } catch (error) {
        console.error('Error deleting glossary:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
