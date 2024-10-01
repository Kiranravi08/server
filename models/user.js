// models/users.js
// models/users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sign_in_method: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true });  // Add this option

module.exports = mongoose.model('User', userSchema);
