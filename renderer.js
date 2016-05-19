//fs is for file system, include for completeness
var fs = require("fs");

function mergeValues(values, content) {
  //Cycle over the keys
  for(var key in values) {
    //Replace all {{key}} with the value from the values object
    //note: values.avatarUrl === values["avatarUrl"], but can't use since don't know which key is being cycled over
    content = content.replace("{{" + key + "}}", values[key]);
  }
  //Return merged content
  return content;
}

function view(templateName, values, response) {
  //Read from the template files
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    //Insert values in to the content
    fileContents = mergeValues(values, fileContents);
    //Write out to the response
    response.write(fileContents);
  
}

module.exports.view = view;