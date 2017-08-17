var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

var url = 'mongodb://localhost:27017/oneread_analytic'; 

exports.testConnection = function(req, res){
//connect to server
MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log('Connected to database server...');
    db.close();
    res.send('connected to database server');
});
};

exports.insertPurchaseData = function(req, res) {
 var requestData = req.body;

    MongoClient.connect(url, function(err, db){
 if(err) throw err;

    var dataObj /* = [
        {
            book_name       :   "book1", 
            book_id         :   2014, 
            after_sample    :   1, 
            is_free         :   0, 
            user_id         :   5214,
            user_name       :   "user001",
            purchase_date_time : 1500948229 , 
            platform        :   "iOS" , 
            profession      :   "Programmer" , 
            age_group       :  "25-32", 
            country         :   "India" , 
            state           :   "Delhi" , 
            zip_code        :   "110034"

        },
        {
            book_name       :   "book1", 
            book_id         :   2014, 
            after_sample    :   1, 
            is_free         :   0, 
            user_id         :   5234,
            user_name       :   "user002",
            purchase_date_time : 1500948229 , 
            platform        :   "Android" , 
            profession      :   "Engineer" , 
            age_group       :  "33-40", 
            country         :   "India" , 
            state           :   "Delhi" , 
            zip_code        :   "110034"

        },
        {
            book_name       :   "book2", 
            book_id         :   2017, 
            after_sample    :   0, 
            is_free         :   0, 
            user_id         :   5234,
            user_name       :   "user002",
            purchase_date_time : 1500948229 , 
            platform        :   "Android" , 
            profession      :   "Engineer" , 
            age_group       :  "33-40", 
            country         :   "India" , 
            state           :   "Delhi" , 
            zip_code        :   "110034"

        },
        {
            book_name       :   "book2", 
            book_id         :   2017, 
            after_sample    :   0, 
            is_free         :   0, 
            user_id         :   5236,
            user_name       :   "user003",
            purchase_date_time : 1510948229 , 
            platform        :   "iOS" , 
            profession      :   "Engineer" , 
            age_group       :  "17-24", 
            country         :   "India" , 
            state           :   "UP" , 
            zip_code        :   "620034"

        }
    ] */; 
    db.collection("purchase_data").insertMany( requestData, function(err, res){
        if(err) throw err;
        var resMsg = "No. of document instered : "+res.insertedCount;
        console.log(resMsg);
        res.json({ resMsg});
        //closing db
        db.close();
    });

});
};
exports.getPurchaseData = function(req, res){
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        db.collection("purchase_data").find({}).toArray(function(err, result){
            if(err) throw err;
            res.send(result);
            db.close();

        });

    });



};

exports.executeQuery = function(req, res){
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var option = parseInt(req.params.option);
       // console.log("params = ", req.params);

        switch(option){
            case 1: 
                var query =  req.body; // { book_name: "book2" };
                db.collection("purchase_data").find(query).toArray(function(err, result) {
                if (err) throw err;
                    res.json(result);  
                    console.log(result);
                    db.close();
                });

             break;

             case 2: 
                //aggrigate query
                //req.body; 
                     var queryObj = [ 
                        { 
                        $group : 
                            { 
                            _id : "$after_sample" }, 
                            count : { $sum : 1 }
                         } ]
                     db.collection('purchase_data', function(err, collection) {

                            collection.aggregate([ 
                                { 
                                $group : 
                                    { 
                                    _id : "$after_sample" }, 
                                    count : { $sum : 1 }
                                 } ], function(err, result){
                                if(err) throw err;
                                console.log(JSON.stringify(result));
                                res.send({"result": result});      
                            });
                    });
             break;
             case 3: 
             res.json("executed option 3");
             break;
             default:
             res.json("executed default option");
             break;

        }


      });



};
