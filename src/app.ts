import express from 'express';
import mongoose from 'mongoose';
import { setRoutes } from './routes/routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Set up routes
app.use('/api', setRoutes());

// MongoDB connection options
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork', mongoOptions)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });