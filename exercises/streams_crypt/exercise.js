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

exercise.addSetup(function (mode, callback) {
  const words = require('./words.json')
  let basePw = words[Math.floor(Math.random() * words.length)]
  while (basePw.length < 32) {
    basePw += basePw
  }
  this.__pw = basePw.slice(0, 32)
  this.__iv = basePw.slice(0, 16)

  this.submissionArgs = [this.__pw, this.__iv]

  if ('verify' === mode) {
    this.solutionArgs = [this.__pw, this.__iv]
  }

  callback(null, true)
})

exercise.addProcessor(function (mode, callback) {
  const stdin = crypto.createCipheriv('aes256', this.__pw, this.__iv)
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
