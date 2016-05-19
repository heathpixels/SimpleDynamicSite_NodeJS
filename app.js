var router = require("./router.js");

//Problem: A simple way to look at a user's badge count and JS points from a web browser.

//Solution: Use nodeJS to perform the profile look ups and server template via HTTP.

//Create a web server
var http = require('http');
http.createServer(function(request, response) {
 router.home(request, response);
 router.user(request, response);
}).listen(3000);
console.log('Server running at http://<workspace-url>/');



