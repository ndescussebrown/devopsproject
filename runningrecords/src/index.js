const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');


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

app.get('/', function(req, res, next){
    res.render('searchrecords');
});

app.listen(port, function(){
    console.log("Server listening the port " +port)
});


