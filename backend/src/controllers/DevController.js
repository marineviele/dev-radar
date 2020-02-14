//index, show, store, update, destroy

const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    //list all devs from db
    async index (req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    //list a specific dev from db
    async show (req, res) {
        //not used
    },

    //store a dev in db
    async store (req, res) {
        //TODO: isolate business rules

        //get data from request
        const { github_username, techs, latitude, longitude } = req.body
        
        //check for duplicate
        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            //get more data from api
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            
            //process data
            const { avatar_url, bio } = apiResponse.data;
            let name = apiResponse.data.name;
            if(!name) name = apiResponse.login;

            const techsArrays = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            // store model in db
            dev = await Dev.create({
                name,
                github_username,
                bio, 
                avatar_url,
                techs: techsArrays,
                location
            })
        }
        
        return res.json(dev);
    },

    //update a specific dev in db = = name, avatar, bio, location, techs
    //TODO: update also avatar_url, bio, etc.
    async update (req, res) {
    
        const { github_username } = req.params;
        const { name } = req.body;

        const myQuery = { github_username }
        const updatedValues = {$set: {name}};

    //* TODO: REVIEW NEXT LOGIC
    // (exception if user doesn't exist + problem in db). 
    // check mongodb documentation
        const updateDev = await Dev.updateOne(
            myQuery,
            updatedValues,
            function (err, res) {
                if(err) {
                    return "there was a problem updating";
                } else {
                    return `user ${github_username} updated`;
                }
            }
        )
        const updateStatus = updateDev.n > 0 ?
             `user ${github_username} updated` :
             "there was a problem updating your dev";
    
        //* END TODO *

        return res.json(updateStatus);
    },

    //destroy a specific dev in db
    async destroy (req, res) {
        const { github_username } = req.params;

        const myQuery = { github_username }

    //* TODO: REVIEW NEXT LOGIC
    // (exception if user doesn't exist + problem in db). 
    // check mongodb documentation
        const deleteDev = await Dev.deleteOne(
            myQuery,
            function (err, res) {
                if(err) {
                    return "there was a problem deleting";
                } else {
                    return `user ${github_username} deleted`;
                }
            }
        )
        const deleteStatus = deleteDev.deletedCount > 0 ?
             `user ${github_username} deleted` :
             "there was a problem deleting your dev";
    
        //* END TODO *

        return res.json(deleteStatus);
    }
}