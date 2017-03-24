// call the packages
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = require('./app/routes');

// REGISTER OUR ROUTES 
app.use('/', router);


// START THE SERVER
app.listen(port,()=>{
console.log('Magic happens on port ' + port);
});
