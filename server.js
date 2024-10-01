const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRoutes,teamRoutes,documentRoutes,glossaryRoutes} = require('./routes')

dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',  // Frontend URL (adjust if needed)
    methods: ['GET', 'POST'],         // Specify the allowed methods
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));





// // Use the routes
app.use('/api/team', teamRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/document', documentRoutes);
app.use('/api/glossary', glossaryRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
