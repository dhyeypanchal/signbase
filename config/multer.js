const multer = require('multer');

const storage =  multer.diskStorage({
    destination: function (req, res, cb){ //cb stands for callback
        cb(null,'./Temp/')
    },
    filename: function (req, file, cb){
        cb(null,Date.now()+"-"+file.originalname) // this is usefull for give random name everytime we upload a file
    }
});


const upload = multer({
    storage:storage
})

module.exports = upload;