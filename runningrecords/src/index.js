const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');


// Create Redis Client
const client = redis.createClient();

client.on("error", function (err) {
    console.error("Errro encountered: ", err);
});

client.on("connect", () => {
    console.log("Redis connected");
});

client.connect(); // connect to the server here!

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


// medthodOverrride
app.use(methodOverride('_method'));

//Search page
app.get('/', function(req, res, next){
    res.render('searchrecords');
});

//Search processing
app.post('/record/search', function (req, res, next){
    let id = req.body.id;

    client.hgetall(id, function (err, obj) {
        if (!obj) {
            res.render('searchrecords', {
                error: 'Record does not exist'
            });
        } else {
            obj.id = id;
            res.render('details', {
                record:obj
            });
        }
    });
});

app.listen(port, function(){
    console.log("Server listening to port " +port)
});


