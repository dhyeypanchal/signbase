const Char = require("../models/Char");

const updateChar = async (req, res) => {
    const {char,image} = req.body;
    try {
        const result = await Char.updateOne({char:char},{$set:{image:image}},{new:true});
        if (result.modifiedCount>0) {
            return res.status(200).send({
                result,
                message:`Successfully updated image for ${char}`,
                success:true
            })
        }
        else{
            return res.status(200).send({
                result,
                message: "there is no such charactor",
                success: true
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error while updating charactor",
            error,
            success: false
        })
    }
}

module.exports = updateChar;