var htmlparser = require('htmlparser2');
var strip = require('strip-comments');
var fs = require('fs');

var isInScript = false;
var buffer = "";
var parser = new htmlparser.Parser({
  onopentag: function(name, attribs) {
    if(name === "script") {
      isInScript = true;
    }
  },
  ontext: function(text) {
    if (isInScript)
      buffer += text;
  },
  onclosetag: function(tagname) {
    if(tagname === "script") {
      isInScript = false;
    }
  },
  onend: function() {
    console.log(strip(buffer, {preserveNewlines: false}));
  }
}, {decodeEntities: true});

fs.readFile('din.html', function(err, data) {
  if (err)
    return console.error(err);

  parser.write(data.toString());
  parser.end();
})
