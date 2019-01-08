const fs = require('fs');

const base_uri = 'http://127.0.0.1:8080/snd/';
const global_ns = 'snd-play';
const interval = 1000;
var clients = [];
var paths = [];
var audio = [];

fs.readdir("./snd", (err, files) => {
  files.forEach(file => {
    paths.push(file);
    audio.push(fs.readFileSync('./snd/'+file))
  });
  console.log("Audio loaded to buffers");
});

module.exports.setIo = function(_io) {
  io = _io;
  ns = io.of(global_ns);
  ns.on('connection', function(socket) {
    clients.push(socket);
  });
  setInterval(function() {
    if (clients.length > 0) {
      var index = Math.floor((Math.random() * clients.length));
      var buf_index = Math.floor((Math.random() * audio.length));
      clients[index].emit("play_snd", { "buffer": audio[buf_index], "name": paths[buf_index] });
    }
  }, interval);
}
