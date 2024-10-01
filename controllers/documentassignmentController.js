const express = require('express');
const router = express.Router();
const File = require('../models/DocumentAssignment'); 

exports.create = async (req, res) => {
    try {
        const {
            team,
            targetLanguage,
            targetDate,
            comments,
            assignedToTeamLead,
            assignedToUsers,
            assignedDocument
        } = req.body;

        // Log the received request body for debugging
        console.log("Received Body:", req.body);

        // Create a new document assignment entry
        const newAssignment = new DocumentAssignment({
            team, // Using shorthand syntax
            targetLanguage,
            targetDate,
            comments,
            assignedToTeamLead,
            assignedToUsers,
            assignedDocument
        });

        // Save the assignment to MongoDB
        const savedAssignment = await newAssignment.save();

        // Log the saved document for verification
        console.log("Saved Assignment:", savedAssignment);

        return res.status(201).json({ message: 'Document assigned successfully!', data: savedAssignment });
    } catch (error) {
        console.error('Error saving assignment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}