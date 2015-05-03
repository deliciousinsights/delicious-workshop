var crypto  = require('crypto');
var tar     = require('tar');
var through = require('through2');
var zlib    = require('zlib');

var parser = tar.Parse();

process.stdin
  .pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
  .pipe(zlib.createGunzip())
  .pipe(parser);

parser.on('entry', function (e) {
  if (e.type !== 'File') {
    return;
  }

  var h = crypto.createHash('md5', { encoding: 'hex' });
  e.pipe(h).pipe(through(null, null, addPath)).pipe(process.stdout);

  function addPath(cb) {
    this.push(' ' + e.path + '\n');
    cb();
  }
});

