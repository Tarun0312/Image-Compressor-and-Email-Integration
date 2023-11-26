const express = require("express");
const router = express.Router();

const { imageUpload,videoUpload,imageSizeReducer,localFileUpload,downloadImage } = require('../controllers/fileUpload');

// map api routes
// cloudinary upload steps -> copy from client and store in server temporarily
                        // -> copy to cloudinary
                        // -> delete from server
 
// db upload steps -> copy from client and store in server db

router.post("/imageUpload",imageUpload);  //upload on cloudinary
router.post("/videoUpload",videoUpload); //upload on cloudinary
router.post("/imageSizeReducer",imageSizeReducer);//up. cloudinary
router.post("/localFileUpload",localFileUpload);//upload on db


module.exports = router;