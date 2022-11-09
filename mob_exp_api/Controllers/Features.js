const Features = require('../Models/Features');

exports.getFeatures = (req, res) => {
    Features.find()
        .then(response => {
            res.status(200).json(
                {
                    message: "Features Fetched Succesfully",
                    features: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}