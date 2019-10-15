/* eslint-disable quotes, no-undef, no-console, no-unused-vars */
var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
var mime = require('mime');

var handleError = function(req, res){
  //Bronze Challenge
  res.writeHead(302, { "Location": "http://" + req.headers['host'] + '/error.html' });
  return res.end();
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);

  fs.readFile(filePath, function(err, data){
    if(err){
      handleError(req,res);
      return res.end();
    }else{
      //Silver Challenge goes here
      console.log(filePath);
      console.log(req.url);
      console.log(mime.getType(req.url)); //THIS RETURNS TEXT/HTML
      //plain text, PDFs, audio files, and movies in app folder
      //console.log(mime.getType(req));
      res.setHeader("Content-type", "text/html");
      res.end(data);
    }
  });
});
server.listen(3000);
