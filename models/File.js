const mongoose = require("mongoose");
const  { transporter,user,pass,host } = require("../config/nodemailer")

const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    tags: {
        type: String
    }
});

// MAIL SEND just after uploaded file entry in DB using post method
// post middleware
fileSchema.post("save", async function(doc) {
    try {
        console.log("Doc", doc);//print document which is added in DB

        // create a transporter 
        // TODO : ADD This config in config folder
        // const transporter = nodemailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     auth: {
        //         user: process.env.MAIL_USER,
        //         pass: process.env.MAIL_PASS,
        //     }
        // });

        console.log("User",user,pass)


        // send mail

        const info = await transporter.sendMail({
            from: user ,
            to: doc.email,
            subject: "New File uploaded on Cloudinary",
            html: `<body><h1>File Uploaded</h1> <p>View here :<a href=${doc.imageUrl}>${doc.imageUrl}</a></p></body> `
        })
      console.log("Info",info)

    } catch (error) {
        console.log(error);
    }

});




const File = mongoose.model("File", fileSchema);
module.exports = File;