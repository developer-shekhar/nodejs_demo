var express = require('express'),
    wine = require('./routes/wines'),
    wineProvider = require('./routes/wineProvider');


var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

//allowed methods
app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
app.get('/wineProvider',wineProvider.testConnection );


app.listen(8081);
console.log('Listening on port 8081...');