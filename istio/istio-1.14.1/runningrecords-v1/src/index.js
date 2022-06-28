const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const recordRouter = require('./routes/recordroutes')

// Initialise app
const app = express();

// Create Redis Client
const rclient = redis.createClient({
     //url: process.env.REDIS_URL,  // These are the parameters required for deployment with Heroku
     //socket: {
    //   tls: true,
    //   rejectUnauthorized: false
     //}
	 //,
    host:'redis-server', port: 6379 // These are the parameters required for orchestration with docker-compose
});

rclient.on("error", function (err) {
    console.error("Error encountered: ", err);
});

rclient.on("connect", function() {
    console.log("Connected to Redis...");
});

//rclient.connect(); // connect to the server here! Only valid from versions 4+ of redis

// Set port
const port = process.env.PORT || 3000;

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
