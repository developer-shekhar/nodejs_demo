var http = require("http");

http.createServer(function(request, response){
//http header and content type
 response.writeHead(200, {'Content-Type':'text/plain'});
 //send response body
 response.end("Hello World \n");	


}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
