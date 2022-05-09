const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

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

//Search page
app.get('/', function(req, res, next){
    res.render('searchrecords');
});

//Process Search
app.post('/record/search', async function(req, res, next){
    let id = req.body.id;

    await rclient.hgetall(id, (err, obj) => {
        if(!obj){
            res.render('searchrecords', {
                error: 'Record does not exist'
            });
        } else {
            obj.id = id;
            res.render('details', {
                record: obj
            });
        }
    });

});

// Add Record 
app.get('/record/add', function (req, res, next) {
    res.render('addrecord');
});

// Process Add Record 
app.post('/record/add', async function (req, res, next) {
    let id = req.body.id;
    let distance = req.body.distance;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let year = req.body.year;
    let time = req.body.time;
    let location = req.body.location;

    await rclient.hmset(id, [
        'distance', distance,
        'first_name', first_name,
        'last_name', last_name,
        'year', year,
        'time', time,
        'location',location
    ], function (err, reply) {
        if (err) {
            console.log(err);
        }
        console.log(reply);
        res.redirect('/');
    });
});

// Delete Record 
app.delete('/record/delete/:id', function (req, res, next) {
    rclient.del(req.params.id);
    res.redirect('/');
});


app.listen(port, function(){
    console.log("Server listening to port " +port)
});


