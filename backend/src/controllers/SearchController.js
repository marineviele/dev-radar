//index, show, store, update, destroy

const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    //list all devs in a 10km radius and filter by techs
    async index (req, res) {
        const { latitude, longitude, techs } = req.query;

        const techsArrays = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                $in: techsArrays,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 1000,
                }
            }
        })

        return res.json(devs)
    }
}