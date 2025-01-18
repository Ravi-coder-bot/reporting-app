const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');

const multer = require('multer');
const path = require('path');

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req,res)=>{
    res.send('Backend is running')
})

app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})