var http = require('http'); //core module
 var port = 8080; //the port on which server is listening
 var host = 'localhost'; //host address of the server

 var requestListener = function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end("My first response")
 }
 
 var server = http.createServer(requestListener);
 server.listen(port,host,function(){
    console.log("Server is running")
 })

