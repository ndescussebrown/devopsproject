const redis = require('redis');

const rclient = redis.createClient({
     url: process.env.REDIS_URL,  // These are the parameters required for deployment with Heroku
     socket: {
       tls: true,
       rejectUnauthorized: false
     }
	 //,
    //host:'redis-server', port: 6379  // These are the parameters required for orchestration with docker-compose
});

const record_search_get = (req,res) => {
    res.render('searchrecords');
}

const record_search = async function (req, res,next) {
    let id = req.body.id;
    await rclient.hgetall(id, (err, obj) => {
        if (!obj) {
            res.render('searchrecords', {
                error: 'Record does not exist'
            });
            return res.status(201);
        }
        else if (err) {
            return callback(err, null);
        }

        else {
            obj.id = id;
            res.render('details', {
                record: obj
            });
            return res.status(200);
        }
    });
}

const record_addupdate_get = (req, res) => {
    res.render('addrecord');
}

const record_addupdate = async function (req, res, next) {
    if (!req.body.id) {
        res.render('addrecord', {
            error: 'Wrong record parameters - enter Record ID'
        });
        return res.status(400);
    }
    else {
        let id = req.body.id;
        let distance = req.body.distance;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let year = req.body.year;
        let time = req.body.time;
        let location = req.body.location;

        await rclient.hgetall(id, async function (err, obj) {
            if (!obj) {
                var obj = {}
                obj.id = id;
                obj.distance = "";
                obj.first_name = "";
                obj.last_name = "";
                obj.year = "";
                obj.time = "";
                obj.location = "";
            }

                obj.id = id;
                if (!req.body.distance) { distance = obj.distance } else { distance = req.body.distance };
                if (!req.body.first_name) { first_name = obj.first_name } else { first_name = req.body.first_name };
                if (!req.body.last_name) { last_name = obj.last_name } else { last_name = req.body.last_name };
                if (!req.body.year) { year = obj.year } else { year = req.body.year };
                if (!req.body.time) { time = obj.time } else { time = req.body.time };
                if (!req.body.location) { location = obj.location } else { location = req.body.location };

                await rclient.hmset(obj.id, [
                    'distance', distance,
                    'first_name', first_name,
                    'last_name', last_name,
                    'year', year,
                    'time', time,
                    'location', location
                ], function (err, reply) {
                    if (err) {
                        return callback(err, null);
                    }
                    console.log(reply);
                    res.redirect('/');
                    return res.status(200);
                });

        })

    }
}

const record_delete = function (req, res, next) {
    if (!req.params.id) { return callback(new Error("Invalid record"), null) }
    rclient.del(req.params.id);
    res.redirect('/');
    return res.status(200);
}

module.exports = {
    record_search_get,
    record_search,
    record_addupdate_get,
    record_addupdate,
    record_delete
}