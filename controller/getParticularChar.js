const Char = require("../models/Char");

const getParticularCharacters = async (req, res) => {

    try {
        let {searchString} = req.body;

        searchString = searchString.toUpperCase();
        
        const characterImages = await Char.find({
            char: { $in: searchString.split('') },
        });

        const imageUrls = characterImages.map((item) => item.image);
        
        if (imageUrls.length>0) {
            return res.status(200).send({
                imageUrls,
                message:"Successfully getting the images",
            })
        }
        else{
            return res.status(204).send({
                message: "There is no characters",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error while getting images",
            error,
            success: false
        })
    }
}

module.exports = getParticularCharacters;