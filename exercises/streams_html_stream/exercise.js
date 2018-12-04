const comparestdout = require('workshopper-exercise/comparestdout')
let exercise = require('workshopper-exercise')()
const execute = require('workshopper-exercise/execute')
const filecheck = require('workshopper-exercise/filecheck')
const fs = require('fs')
const path = require('path')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

exercise.addProcessor(function(mode, callback) {
  const stdin = fs.createReadStream(path.resolve(__dirname, 'input.html'))
  stdin.pipe(this.submissionChild.stdin)

  if ('verify' === mode) {
    stdin.pipe(this.solutionChild.stdin)
  }

  this.longCompareOutput = true

  callback(null, true)
})

// compare stdout of solution and submission
exercise = comparestdout(exercise)

module.exports = exercise
