const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(() => {console.log("Database connected successfully");})
    .catch((error) => {
        console.log("Error while connecting with DB")
        console.log(error);
        process.exit(1);
    })
}

module.exports = dbConnection;