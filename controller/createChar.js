const Char = require("../models/Char");
const cloudinary = require('cloudinary').v2;
const fs = require("fs")
const path1 = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const createChar1 = async (req, res) => {
    try {
        const { char } = req.body;
        console.log(req.body);
        if (char.length != 1) {
            return res.status(400).send({
                message: "Please enter only 1 char",
                success: false
            })
        }
        const available = await Char.findOne({char})
        // console.log(available);
        if (available) {
            return res.status(400).send({
                message: "Charactor already available",
                success: false
            })
        }

        console.log(req.file);
        if(req.file){
            var url = await uploadToCloudinary(req.file.path);
            if(url.message== "Fail"){
                return res.status(400).send({
                    msg: "Failed to Upload to the Cloudinary, please try again later..."
                })
            }
        }
        else{
            return res.status(400).send({
                msg: "Please Provide Image File First..."
            })
        }
        

        let isalpha = 0;
        const asciiValue = char.charCodeAt(0); // this is used for findout ascii value for the charactor
        if (asciiValue >= 65 && asciiValue <= 90) {
            isalpha = 1;
            const result = await Char.create({
                char: char,
                image: url.url,
                isAlpha: isalpha
            })
            return res.status(200).send({
                message: "Charactor inserted successfully",
                result,
                success: true
            })
        }
        else {
            const result = await Char.create({
                char: char,
                image: url.url,
                isAlpha: isalpha
            })
            return res.status(200).send({
                message: "Charactor inserted successfully",
                result,
                success: true
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error while adding character",
            error,
            success: false
        });
    }
}

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

module.exports = {createChar1};