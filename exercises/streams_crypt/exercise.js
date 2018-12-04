const comparestdout = require('workshopper-exercise/comparestdout')
const crypto = require('crypto')
let exercise = require('workshopper-exercise')()
const execute = require('workshopper-exercise/execute')
const filecheck = require('workshopper-exercise/filecheck')
const fs = require('fs')
const path = require('path')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

exercise.addSetup(function(mode, callback) {
  const words = require('./words.json')
  this.__pw = words[Math.floor(Math.random() * words.length)]

  this.submissionArgs = [this.__pw]

  if ('verify' === mode) {
    this.solutionArgs = [this.__pw]
  }

  callback(null, true)
})

exercise.addProcessor(function(mode, callback) {
  const stdin = crypto.createCipher('aes256', this.__pw)
  fs.createReadStream(path.resolve(__dirname, 'input.txt')).pipe(stdin)

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
