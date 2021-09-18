const express = require('express');
const connectDb = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors'); // for frontend development to call api if they in localhost

const app = express();


// cors 
app.use(cors());

// bodyParser json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//connect db
connectDb();



// define route

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server run on PORT ${PORT}`))