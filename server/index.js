const express = require('express');
const connectDb = require('./config/db');

const app = express();
//connect db
connectDb();



// define route

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server run on PORT ${PORT}`))