
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


// local File upload
exports.localFileUpload = async (req, res) => {
    try {
        // fetch file from client m/c request
        const file = req.files.file;
        console.log("File -> ", file)

        const extension = `.${file.name.split('.').at(-1)}`
        // create path where need to be stored on ther server
        const path = __dirname + "/files/" + Date.now() + extension;
        console.log("Path => ", path)

        // add path to the the move function
        file.mv(path, (error) => {
            console.log(error);
        })

        // create a successdul response
        res.status(200).json({
            success: true,
            message: "Local File Uploaded Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while file uploading"
        })

    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloud(file, folder,quality) {
    const options = { folder ,resource_type : "auto"};

    if(quality){
        options.quality = quality;
    }
    console.log(file.tempFilePath)
    return await cloudinary.uploader.upload(file.tempFilePath, options);
    
}

// image upload
exports.imageUpload = async (req, res) => {
    try {
        // fetch data from req.body 

        const { name, email, tags } = req.body;
        console.log(name,email,tags);

        // fetch file
        const file = req.files.imageFile;
        console.log(file)

        // Validation file supported type (jpg,jpeg,png)
        const supportedTypes = ["jpg", "jpeg", "png"];
        const extension = file.name.split(".").at(-1).toLowerCase();
        if (!isFileTypeSupported(extension, supportedTypes)) {
            return res.status(400).json({
                success: "false",
                message: "File Format not supported"
            })
        }

        // file format supported

        // upload in cloudinary
        const response = await uploadFileToCloud(file, "media");
        console.log(response);

        // save entry in db
        const fileData= await File.create({  
               name, 
               email, 
               imageUrl : response.secure_url , 
               tags 
            });

        res.status(200).json({
            success: true,
            data : fileData,
            message: "Image uploaded in cloudinary(media management service) success"
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Error while image uploading'
        })
    }
}

// video upload

exports.videoUpload = async (req,res) => {
    try{
        // fetch data from request body
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        // fetch file
        const file = req.files.videoUpload;
        console.log(file)

        // validations supported files(mp4,mov)
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split(".").at(-1).toLowerCase();

        // TODO : add a upper limit of 5mb for a video
        if(!isFileTypeSupported(fileType,supportedTypes) || file.size>=5*1024*1024){
            return res.status(400).json({
                success : false,
                message : "Video Format not supported and size is greater than 5mb Size= "+file.size,
            })
        }

        // supported video file format
        // upload on cloudinary
        const response = await uploadFileToCloud(file,"media");

        const fileData = await File.create({
          name,
          tags,
          email,
          imageUrl : response.secure_url,
        })

        return res.status(200).json({
            success : true,
            data : fileData,
            message : "Video uploaded in cloudinary successfully",
        })
    } catch(error){
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Video not uploaded in cloudinary due to some issue",
        })
    }
}

// imageSizeReducer
exports.imageSizeReducer = async (req,res) => {
    try{

        const {name,tags,email} =req.body;
        let { quality } = req.body;
        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split(".").at(-1).toLowerCase();
        // TODO : add a upper limit of 5mb for a video
        if(!isFileTypeSupported(fileType,supportedTypes) || file.size>5*1024*1024){
            return res.status(400).json({
                success : false,
                message : "File Format not support and size is greater than 5mb Size= "+file.size,
            })
        }

        // supported format hai 
        // (add quality parameter to compress image)
        // 
       quality = !quality ? 50 : quality
        const response = await uploadFileToCloud(file,"media",50);
        // save entry in db
        const fileData = await File.create({
            name, 
            email, 
            imageUrl : response.secure_url , 
            tags 
        }) 

      

        res.status(200).json({
            success: true,
            data : fileData,
            message: "Image uploaded in cloudinary(media management service) success"
        })
    } catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : "Something went wrong",
        })
    }
}

