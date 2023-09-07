const Char = require("../models/Char");


const getNumber = async (req, res) => {

    try {
        const result = await Char.find({ isAlpha: 0 });
        if (result.length>0) {
            return res.status(200).send({
                result,
                message: "Successfully getting the Numbers",
                success: true
            })
        }
        else{
            return res.status(200).send({
                result,
                message: "there is no numbers",
                success: true
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error while getting numbers",
            error,
            success: false
        })
    }
}

module.exports = getNumber;