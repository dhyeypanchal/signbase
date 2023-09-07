const Char = require("../models/Char");

const getAlphabets = async (req, res) => {

    try {
        const result = await Char.find({isAlpha:1});
        if (result.length>0) {
            return res.status(200).send({
                result,
                message: "Successfully getting the alphabets",
                success: true
            })
        }
        else{
            return res.status(200).send({
                result,
                message: "There is no alphabets",
                success: true
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error while getting alphabets",
            error,
            success: false
        })
    }
}

module.exports = getAlphabets;