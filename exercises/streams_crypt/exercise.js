var comparestdout = require('workshopper-exercise/comparestdout');
var crypto        = require('crypto');
var exercise      = require('workshopper-exercise')();
var execute       = require('workshopper-exercise/execute');
var filecheck     = require('workshopper-exercise/filecheck');
var fs            = require('fs');

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

exercise.addSetup(function(mode, callback) {
  var words = require('./words.json');
  this.__pw = words[Math.floor(Math.random() * words.length)];

  this.submissionArgs = [this.__pw];

  if ('verify' === mode) {
    this.solutionArgs = [this.__pw];
  }

  callback(null, true);
});

exercise.addProcessor(function(mode, callback) {
  var stdin = crypto.createCipher('aes256', this.__pw);
  fs.createReadStream(__dirname + '/finnegans_wake.txt').pipe(stdin);

  stdin.pipe(this.submissionChild.stdin);

  if ('verify' === mode) {
    stdin.pipe(this.solutionChild.stdin);
  }

  this.longCompareOutput = true;

  callback(null, true);
});

// compare stdout of solution and submission
exercise = comparestdout(exercise)

module.exports = exercise
