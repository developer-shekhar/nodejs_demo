
//import event module
var events  = require('events');

//an event object
var eventEmitter = new events.EventEmitter();

//create a event handler
var connectHandler = function(){

	console.log('connection successful.');
	//fire a event : data_received 
	eventEmitter.emit('data_received');
}

var notifiyConnection = function(){

	console.log(' connected ...');
	eventEmitter.emit('notify_user');

}

// create a event and bind handler
eventEmitter.on('connection', connectHandler);
eventEmitter.on('connection', notifiyConnection);

//observe event and perform some action
eventEmitter.on('data_received', function(){

	console.log("data received successfully. Now formating data");
});

eventEmitter.on('notify_user', function(){

	console.log('Hey User, you are connected to data source');

})


//fire event programmatically
eventEmitter.emit('connection');

//end of program
console.log('program ended');  

