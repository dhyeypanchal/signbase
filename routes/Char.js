const express = require("express");
const createChar = require("../controller/createChar");
const getCharactor = require("../controller/getCharactors");
const getAlphabets = require("../controller/getAlphabets");
const getNumber = require("../controller/getNumbers");
const updateChar = require("../controller/updateCharImage");
const getParticularCharacters = require("../controller/getParticularChar");
const router = express.Router();
const fs = require('fs');
const multer = require("multer");

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
  
var upload = multer({ storage: storage });

// for adding new charactor
router.post("/add-char", upload.single('image'), createChar.createChar1);

// for getting all the charactors
router.get("/get-all",getCharactor)

// for getting all the charactors
router.get("/get-all-alpha",getAlphabets)

// for getting all the charactors
router.get("/get-all-num",getNumber)

// for updating the charactor
router.put("/update-char",updateChar)

//for getting particular characters
router.get("/get-particular-char", getParticularCharacters)

module.exports = router;
