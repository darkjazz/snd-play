var cors = require('cors')
var express = require('express');
var bodyParser = require('body-parser');
var front = require('./front');
var snd = require('./snd');
var http = require('http');
var socket = require('socket.io');

var app = module.exports = express();
var server = http.Server(app);
var io = socket(server);
// io.set('origins', '*:*');
snd.setIo(io);

var port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send(front.serve_front())
});

server.listen(port, function () {
  console.log('SNDplay server listening on port ' + port + '!')
});
