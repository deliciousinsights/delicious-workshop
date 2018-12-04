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
  const ciphers = ['AES-256-CBC', 'RC4', 'BF-CBC']
  this.__cipher = ciphers[Math.floor(Math.random() * ciphers.length)]
  this.__pw = phrase()

  this.submissionArgs = [this.__cipher, this.__pw]

  if ('verify' === mode) {
    this.solutionArgs = [this.__cipher, this.__pw]
  }

  callback(null, true)
})

exercise.addProcessor(function(mode, callback) {
  const stdin = crypto.createCipher(this.__cipher, this.__pw)
  fs.createReadStream(path.resolve(__dirname, 'secretz.tar.gz')).pipe(stdin)

  stdin.pipe(this.submissionChild.stdin)

  if ('verify' === mode) {
    stdin.pipe(this.solutionChild.stdin)
  }

  this.longCompareOutput = true

  callback(null, true)
})

// compare stdout of solution and submission
exercise = comparestdout(exercise)

function phrase() {
  const chars = []
  var s = ''
  for (let i = 0; i < 16; i++) {
    chars.push(String.fromCharCode(Math.random() * 26 + 97))
  }
  return chars.join('')
}

module.exports = exercise
