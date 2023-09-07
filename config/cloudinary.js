const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

async function uploadToCloudinary(locaFilePath) {

    const a = await cloudinary.uploader.upload(locaFilePath)

    if(a){
        fs.unlinkSync(locaFilePath);
        return {
            message: "Success",
            url: a.url
        }
    }
    else{
        fs.unlinkSync(locaFilePath);
        return { 
            message: "Fail"
        };
    }
}

module.exports = uploadToCloudinary;
// exports.uploads = (file)=>{
//     return cloudinary.uploader.upload(file)
// }
