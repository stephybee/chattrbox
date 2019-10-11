/* eslint-disable quotes, no-undef, no-console, no-unused-vars */
var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');

var handleError = function(err, res){
  //Bronze Challenge goes here
  res.writeHead(404);
  res.end();
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);

  fs.readFile(filePath, function(err, data){
    if(err){
      handleError(err, res);
      return;
    }else{
      //Silver Challenge goes here
      res.end(data);
    }
  });
});
server.listen(3000);
