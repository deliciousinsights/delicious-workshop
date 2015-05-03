#!/usr/bin/env node

const Workshopper = require('workshopper-adventure')

const workshopper = new Workshopper({
  appDir: __dirname,
  header: require('workshopper-adventure/default/header'),
  languages: ['fr'],
})
workshopper.addAll(require('./exercises/menu.json'))
workshopper.execute(process.argv.slice(2))
