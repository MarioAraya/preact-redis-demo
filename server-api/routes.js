let express = require('express')
let router = express();    
let redis = require('redis')
let axios = require('axios')
let request = require('request')


module.exports = function(app) {
    // Redis connect
    var redisClient = redis.createClient()
    redisClient.on('connect', function(err) {
        console.log('Redis connected...')
    })
    redisClient.on('error', function(err) {
        console.log('error: ' + err)
    })


    app.get('/api/redis/getall', function(req, res, next) {
        redisClient.hgetall("Santiago,CL", function(err, obj) {
            if( !obj ) {
                console.log('No cities saved.')
            } else {
                console.log(obj)
            }
            res.send(obj);
        });
    })

    app.get('/api/redis/store', function(req, res) {
        //Setear lat/long en dos SET de redis, no tratar de guardar json
        redisClient.hmset("Santiago,CL", [
            'lattitude', -33.459229,
            'longitude', -70.645348
        ], function( err, reply) {
            if(err) console.log(err);
            console.log(reply);
        })
        redisClient.hmset("Zurich,SW", [
            'lattitude', -7.451542,
            'longitude', -8.564572
        ], function( err, reply) {
            if(err) console.log(err);
            console.log(reply);
        })
    })

    // Obtiene coordenadas desde API google :ciudad string. ej:"Santiago,CL"
    app.get('/api/google-api/:ciudad', function(req, res) {
        request.get({
            url: 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBsQYXKHEPSZ7iiapj7okgxoar6KPsypHM&address=' + req.params.ciudad,
            json: true
        }, function(error, response, body){
            if(error){
                console.log('ERROR with user request.');
                return res.sendStatus(500);
            }
            else {
                return res.status(200).send(body.results[0].geometry.location);       
            }
        });
    })

    app.get('/', function (req, res) {
        res.send('GET request to the homepage CTM')
    })
}


