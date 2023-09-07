const Char = require("../models/Char");
const cloudinary = require('../config/cloudinary');
const fs = require("fs")
const path1 = require('path');


const createChar = async (req, res) => {
    try {
        const { char } = req.body;
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
        const uploader = async (path) => await cloudinary.uploads(path)
        const file = req.file;
        const { path } = file;
        const newPath = await uploader(path)
        const url = newPath.url;
        const siblingFolderPath = path1.join(__dirname, '../Temp'); // Specify the path to the sibling folder

        fs.readdir(siblingFolderPath, (err, files) => {
            if (err) {
                console.error('Error reading the sibling folder:', err);
                return;
            }

            // Iterate through the files in the sibling folder
            files.forEach((fileName) => {
                const filePath = path1.join(siblingFolderPath, fileName);

                // Delete each file
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(`Error deleting ${fileName}:`, unlinkErr);
                    } else {
                        console.log(`Deleted ${fileName}`);
                    }
                });
            });
        });

        let isalpha = 0;
        const asciiValue = char.charCodeAt(0); // this is used for findout ascii value for the charactor
        if (asciiValue >= 65 && asciiValue <= 90) {
            isalpha = 1;
            const result = await Char.create({
                char: char,
                image: url,
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
                image: url,
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
};

module.exports = createChar;


// module.exports = createChar;