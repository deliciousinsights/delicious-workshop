var exercise      = require('workshopper-exercise')();
var filecheck     = require('workshopper-exercise/filecheck');
var execute       = require('workshopper-exercise/execute');
var comparestdout = require('workshopper-exercise/comparestdout');
var through       = require('through');

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// set up the data file to be passed to the submission
exercise.addProcessor(function (mode, callback) {
  var aliens = require('./aliens.json');
  var tr = through();

  var count = 0;
  var iv = setInterval(function () {
      if (++count === 10) {
          clearInterval(iv);
          return tr.queue(null);
      }
      var alien = aliens[Math.floor(Math.random() * aliens.length)];
      tr.queue(alien.toLowerCase() + '\n');
  }, 50);

  tr.pipe(this.submissionChild.stdin);

  if ('verify' === mode) {
    tr.pipe(this.solutionChild.stdin);
  }

  callback(null, true);
})

// compare stdout of solution and submission
exercise = comparestdout(exercise)

module.exports = exercise
