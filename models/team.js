const mongoose = require('mongoose');

// Define the team schema
const teamSchema = new mongoose.Schema({
   
    name: { 
        type: String, 
        required: true 
    }, // Team name field
    team_lead: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, // Reference to User model
    team_users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }], // Array of references to User model
    team_users_details: [{                     
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }, // Reference to User model
        name: { 
            type: String 
        } // Name of the user
    }],
    description: { 
        type: String 
    }, // Description of the team
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the model from the schema
const Team = mongoose.model('Team', teamSchema);

// Export the model to use in other parts of the application
module.exports = Team;
