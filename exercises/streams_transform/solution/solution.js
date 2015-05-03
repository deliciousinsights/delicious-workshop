var through = require('through2');
var tr = through(function(buf, __, cb) {
  this.push(buf.toString().toUpperCase());
  cb();
});

process.stdin.pipe(tr).pipe(process.stdout);
