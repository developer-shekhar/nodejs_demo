var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://localhost:27017/wines'; 

exports.testConnection = function(req, res){
    //connect to server
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log('Connected to database server...');
        db.close();
        res.send('connected to database server');
    });
};
