const express = require("express");
const createChar = require("../controller/createChar");
const getCharactor = require("../controller/getCharactors");
const getAlphabets = require("../controller/getAlphabets");
const getNumber = require("../controller/getNumbers");
const updateChar = require("../controller/updateCharImage");
const upload = require('../config/multer');
const router = express.Router();


// for adding new charactor
router.post("/add-char", upload.single('image'), createChar);

// for getting all the charactors
router.get("/get-all",getCharactor)

// for getting all the charactors
router.get("/get-all-alpha",getAlphabets)

// for getting all the charactors
router.get("/get-all-num",getNumber)

// for updating the charactor
router.put("/update-char",updateChar)

module.exports = router;