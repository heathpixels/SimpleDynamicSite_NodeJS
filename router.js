var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

//Handle the HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //If url == "/" && GET
  if(request.url === "/") {
    if(request.method.toLowerCase() === "get") {
      //show search
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      //If url == "" && POST
      
      //get the POST data from body 
      request.on("data", function(postBody) {
        //extract the username
        var query = querystring.parse(postBody.toString());
        //redirect to /:username (don't have to use full url because in same domain)
        response.writeHead(303, {"Location":"/" + query.username});
        response.end();
      });

    }
  }

}

//Handle HTTP route GET / :username i.e. /chalkers
function user(request, response) {
  //if url== "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view("header", {}, response);
    
    //get json from treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON) {
      //show profile
      
      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //Simple response
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });
    
    //on "error" 
    studentProfile.on("error", function(error) {
      //show error
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });
        
  }
}

module.exports.home = home;
module.exports.user = user;

