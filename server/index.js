const express = require('express');
const connectDb = require('./config/db');

//connect db
connectDb();


const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server run on PORT ${PORT}`))