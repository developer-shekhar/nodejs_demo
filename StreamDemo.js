//import file system module
var fs  = require("fs");

//read stream
var readerStream = fs.createReadStream("input.txt");
//handle stream event
var data = "";
readerStream.on('data', function(chunk){
	//after reading each chunk
	data += chunk;

});

readerStream.on('end', function(){
	//reading stream completed
	console.log(data);

});
//handle error if any
readerStream.on('error', function(err){
	conole.log("error reading data : ", err.stack);
});

//program ends
console.log(" Stream Part 1 : ends");

console.log(" Stream Part 2 : begins");

var writterStream = fs.createWriteStream("out.txt");
var outData = "The quick brown fox jumps right over the lazy dog";
//write data
writterStream.write(outData, "UTF8");
//mark end of file
writterStream.end();
//handle write finish or error event
writterStream.on('finish', function(){
	console.log("completed writing to file");

});

writterStream.on('error', function(err){

	console.log("there were error while writing data to file. Error detail : ", err.stack);

})
console.log(" Stream Part 2 : ends");

console.log(" Stream Part 3 : begins ++++++ piping the stream +++++++++");

var inputStream = fs.createReadStream("input.txt");
var outputStream = fs.createWriteStream("out1.txt");
//write content of input.txt to out1.txt
inputStream.pipe(outputStream);

console.log(" Stream Part 3 : ends");

console.log(" Stream Part 4 : begins ++++++ chaining the stream +++++++++");
//import zip utility lib
var zlib = require("zlib");
fs.createReadStream("input.txt")
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream("input.txt.gzip"));

console.log("file compressed");

console.log(" Stream Part 4 : ends");

