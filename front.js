// var express = require('express');
var fs = require('fs');

module.exports.serve_front = function() {
  var index = fs.readFileSync("./index.html", 'utf-8');
  return index;
}
