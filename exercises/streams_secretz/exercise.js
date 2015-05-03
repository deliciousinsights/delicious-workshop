var comparestdout = require('workshopper-exercise/comparestdout');
var crypto        = require('crypto');
var exercise      = require('workshopper-exercise')();
var execute       = require('workshopper-exercise/execute');
var filecheck     = require('workshopper-exercise/filecheck');
var fs            = require('fs');
var through       = require('through');

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

exercise.addSetup(function(mode, callback) {
  var ciphers = [ 'AES-192-CBC', 'RC4', 'BF-CBC' ];
  this.__cipher = ciphers[Math.floor(Math.random() * ciphers.length)];
  this.__pw = phrase();

  this.submissionArgs = [this.__cipher, this.__pw];

  if ('verify' === mode) {
    this.solutionArgs = [this.__cipher, this.__pw];
  }

  callback(null, true);
});

exercise.addProcessor(function(mode, callback) {
  var stdin = crypto.createCipher(this.__cipher, this.__pw);
  fs.createReadStream(__dirname + '/secretz.tar.gz').pipe(stdin);

  stdin.pipe(this.submissionChild.stdin);

  if ('verify' === mode) {
    stdin.pipe(this.solutionChild.stdin);
  }

  this.longCompareOutput = true;

  callback(null, true);
});

// compare stdout of solution and submission
exercise = comparestdout(exercise)

function phrase() {
  var s = '';
  for (var i = 0; i < 16; i++) {
    s += String.fromCharCode(Math.random() * 26 + 97);
  }
  return s;
}

module.exports = exercise
