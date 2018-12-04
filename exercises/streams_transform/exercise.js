let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const execute = require('workshopper-exercise/execute')
const comparestdout = require('workshopper-exercise/comparestdout')
const through = require('through')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

const COUNT = 10

// set up the data file to be passed to the submission
exercise.addProcessor(function(mode, callback) {
  const characters = require('./cite-de-la-peur.json')
    .sort(() => Math.random() - 0.5)
    .slice(0, COUNT)
  const tr = through()

  let count = 0
  const iv = setInterval(() => {
    if (++count === COUNT) {
      clearInterval(iv)
      return tr.queue(null)
    }

    const character = characters.shift()
    tr.queue(character.toLowerCase() + '\n')
  }, 50)

  tr.pipe(this.submissionChild.stdin)

  if ('verify' === mode) {
    tr.pipe(this.solutionChild.stdin)
  }

  callback(null, true)
})

// compare stdout of solution and submission
exercise = comparestdout(exercise)

module.exports = exercise
