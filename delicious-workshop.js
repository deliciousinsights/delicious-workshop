#!/usr/bin/env node

const path = require('path');
const workshopper = require('workshopper');

workshopper({
  name: "delicious-workshop",
  appDir: __dirname,
  languages: ['fr', 'en']
});
