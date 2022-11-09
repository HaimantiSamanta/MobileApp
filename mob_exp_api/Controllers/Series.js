const Series = require('../Models/Series');

exports.getSeriesByFeature = (req, res) => {
    const locId = req.params.locId;

    Series.find({ feature_id: locId })
        .then(response => {
            res.status(200).json(
                {
                    message: "Series Fetched Succesfully",
                    series: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.serieFilter = (req, res) => {
    let { brandtype, feature, speciality, lcost, hcost, sort, page } = req.body;

    sort = sort ? sort : 1;
    page = page ? page : 1;

    const ItemsPerPage = 2;

    let startIndex = ItemsPerPage * page - ItemsPerPage;
    let endIndex = ItemsPerPage * page;

    let filterObj = {};

    brandtype && (filterObj['brandtype_id'] = brandtype);
    feature && (filterObj['feature_id'] = feature);
    speciality && (filterObj['speciality_id'] = { $in: speciality });
    lcost && hcost && (filterObj['min_price'] = { $lte: hcost, $gte: lcost });


    Series.find(filterObj).sort({ min_price: sort })
        .then(response => {

            // Pagination Logic

            const paginatedResponse = response.slice(startIndex, endIndex);

            let arr = [];
            for (let i = 1; i <= Math.ceil(response.length / ItemsPerPage); i++) {
                arr.push(i);
            }

            res.status(200).json(
                {
                    message: "Series Fetched Succesfully",
                    series: paginatedResponse,
                    pageCount: arr,
                    currentPage: page
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getSerieDetailsById = (req, res) => {
    const resId = req.params.resId;

    Series.findById(resId)
        .then(response => {
            res.status(200).json(
                {
                    message: "Serie Fetched Succesfully",
                    serie: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}