const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/users');
const plants = require('./routes/plants');
const app = express();

connectDB();

app.use(express.json({extended:false}));

app.use('/api/users',users);
app.use('/api/plants',plants);

const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})