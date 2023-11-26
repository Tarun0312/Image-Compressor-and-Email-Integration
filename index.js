// app create
const express = require("express");
const app = express();

// port find krna hai
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// middleware for uploading file in server
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// mount api rount
const fileUploadRoutes = require("./routes/FileUpload")
app.use("/api/v1/upload",fileUploadRoutes);

// db connection 
const dbConnection= require("./config/database");
dbConnection();

// cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// activate the port
app.listen(PORT,() => {
    console.log(`Server started at PORT  No. ${PORT} successfully`);
})

// default route
app.get("/",(req,res) => {
    res.send("<h1>This is a home page for file upload</h1>")
})
