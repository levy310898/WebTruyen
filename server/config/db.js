const mongoose = require('mongoose');
require('dotenv').config()

const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zucw3.mongodb.net/WebTruyen?retryWrites=true&w=majority`

console.log(dbLink);
const connectDb = async () => {
  try {
    await mongoose.connect(dbLink, {
    //   useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useFindAndModify:false
    });

    console.log("mongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}

module.exports = connectDb