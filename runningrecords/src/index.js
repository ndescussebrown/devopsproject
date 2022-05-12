const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const recordRouter = require('./routes/recordroutes')

// Create Redis Client
const rclient = redis.createClient();

rclient.on("error", function (err) {
    console.error("Error encountered: ", err);
});

rclient.on("connect", function() {
    console.log("Connected to Redis...");
});

//rclient.connect(); // connect to the server here! Only valid from versions 4+ of redis

// Set port
const port = 3000;

// Initialise app
const app = express();

// View engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));

app.use(recordRouter)

const server = app.listen(port, function(){
    console.log("Server listening to port " +port)
});

function stop() {
    server.close();
}


module.exports = server;
module.exports.stop = stop;