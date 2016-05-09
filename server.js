var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

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

app.get('/api/operation', function (req, res) {
  var nodeId = parseInt(req.query.node);
  var operationName = req.query.op;

  var newOp = new DOMOp({
    node: nodeId,
    operation: operationName
  });

  newOp.save(function(err, item) {
    if (err)
      throw err;
  
    console.log("saved", item);
  });

  res.send();
});

app.get('/about', function (req, res) {
  console.log('DIN API server');

  res.send();
});

/*
//DOMOp.find({ node: '2' }, function(err, item) {
DOMOp.find({}, function(err, item) {
  if (err)
    throw err;

  console.log("found", item);
  for (var i = 0; i < item.length; i++) {
    item[i].remove(function(err) {
      if (err) throw err;
      console.log("deleted!");
    });
  }
});
*/
