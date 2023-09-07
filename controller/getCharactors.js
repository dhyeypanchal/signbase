const Char = require("../models/Char");

const getCharactor = async (req, res) => {

    try {
        const result = await Char.find();
        if (result.length>0) {
            return res.status(200).send({
                result,
                message:"Successfully getting the data",
                success:true
            })
        }
        else{
            return res.status(200).send({
                result,
                message: "There is no charactors",
                success: true
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error while getting charactors",
            error,
            success: false
        })
    }
}

module.exports = getCharactor;