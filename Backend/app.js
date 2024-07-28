const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { connectToMongoDB } = require('../Backend/db/connectToMongoDB');
const transactionalRoutes = require('../Backend/routes/transactions')


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://project2-78r3.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api/v1', transactionalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});