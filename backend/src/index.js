const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const Constants = require('./resources/privateConstants');


//init app
const app = express();

//connect to database
mongoose.connect(Constants.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//allow react connection
app.use(cors ({ origin: 'http://localhost:3000'}));

//read json files
app.use(express.json());

//use routes
app.use(routes);

//app host direction
app.listen(3333);
