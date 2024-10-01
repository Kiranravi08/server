const user = require("../models/user.js");


exports.create= async(req,res) => {
    const { name, email, sign_in_method, status, role } = req.body;
    try {
        const newUser = new User({ name, email, sign_in_method, status, role });
        await newUser.save();
        res.status(201).json({ message: 'User saved successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, unable to save user' });
    }
}

exports.List= async(req,res) => {
    try {
        const users = await user.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, unable to retrieve users' });
    }
}

exports.delete= async(req,res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, unable to delete user' });
    }
}

