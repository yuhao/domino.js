var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.json());

var server = app.listen(3000, function(){
  console.log("We have started our server on port 3000");
});

var db = mongoose.createConnection('mongodb://localhost/din');
db.on('error', console.error);
db.once('open', function() {
  console.log("MongoDB opened");
});

var DOMSchema = new mongoose.Schema({
  node: Number,
  operation: String
});

var DOMOp = db.model('dom', DOMSchema);

app.get('/', function (req, res) {
  console.log('Hello World!');

  res.send();
});

function saveNewOp(nodeId, operationName) {
  var newOp = new DOMOp({
    node: nodeId,
    operation: operationName
  });

  newOp.save(function(err, item) {
    if (err)
      throw err;
  
    console.log("saved", item);
  });
}

app.post('/api/operation', function(req, res) {
  var keys = Object.keys(req.body);
  for (var i = 0; i < keys.length; i++) {
    //var timestamp = keys[i];
    var record = req.body[keys[i]];
    var node = record.id;
    var operation = record.op;

    saveNewOp(node, operation);
  }

  res.send();
});

app.get('/about', function (req, res) {
  console.log('DIN API server');

  res.send();
});

