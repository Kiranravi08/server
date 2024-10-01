const Team = require("../models/team.js");
const user = require("../models/user.js");



exports.create= async(req,res) => {
    try {
        console.body(req.body)
        const { name, team_lead, team_users, description } = req.body;

        // Fetch user details for the selected team users
        const teamUsersDetails = await user.find({ _id: { $in: team_users } }, 'name');

        // Create a new team with the provided data
        const newTeam = new Team({
            name,             // Team name
            team_lead,       // ID of the team lead
            team_users,      // Array of user IDs
            team_users_details: teamUsersDetails.map(user => ({ userId: user._id, name: user.name })), // Save IDs and names
            description,      // Description of the team
        });

        // Save the team to the database
        await newTeam.save();

        // Return success response with the saved team details
        res.status(201).json({ message: 'Team created successfully', team: newTeam });
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
}


exports.list= async(req,res) => {
    try {
        // Populating 'team_lead' with both '_id' (default) and 'name'
        const teams = await Team.find().populate('team_lead', '_id name');
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error });
    }
}

exports.listId= async(req,res) => {
    const teamId = req.params.id;

    try {
        const team = await Team.findById(teamId).populate('team_lead', '_id name').populate('team_users', '_id name');
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team details', error });
    }
}

exports.delete= async(req,res) => {
    try {
        const teamId = req.params.id;
        const team = await Team.findByIdAndDelete(teamId);
        
        if (!team) {
            return res.status(404).send({ message: 'Team not found' });
        }

        res.status(200).send({ message: 'Team deleted successfully' });
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).send({ message: 'Server error' });
    }
}