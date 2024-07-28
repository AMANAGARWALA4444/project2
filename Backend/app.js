const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { connectToMongoDB } = require('../Backend/db/connectToMongoDB');
const transactionalRoutes = require('../Backend/routes/transactions')


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000","https://project2-78r3.vercel.app"],
    credentials:true
}));

app.use('/api/v1', transactionalRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () =>
{
    connectToMongoDB();
    console.log(`Port is running on server ${PORT}`);
})