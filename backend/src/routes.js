const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//HTTP METHODS
routes.get('/devs',DevController.index); //get all devs
routes.get('/search', SearchController.index); //get all devs near me
routes.post('/devs', DevController.store); //store dev
routes.put('/devs/:github_username', DevController.update); //update dev
routes.delete('/devs/:github_username', DevController.destroy); //destroy dev

module.exports = routes;