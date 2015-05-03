var comparestdout = require('workshopper-exercise/comparestdout');
var exercise      = require('workshopper-exercise')();
var execute       = require('workshopper-exercise/execute');
var filecheck     = require('workshopper-exercise/filecheck');
var fs            = require('fs');

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

exercise.addProcessor(function(mode, callback) {
  var stdin = fs.createReadStream(__dirname + '/input.html');
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
