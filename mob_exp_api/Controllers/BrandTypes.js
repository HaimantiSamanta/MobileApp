const BrandTypes = require('../Models/BrandTypes');

exports.getBrandTypes = (req, res) => {
    BrandTypes.find()
        .then(response => {
            res.status(200).json(
                {
                    message: "BrandTypes Fetched Succesfully",
                    brandtypes: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}