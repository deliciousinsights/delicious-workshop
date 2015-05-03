const { Transform } = require('stream')

const upperCaser = new Transform({
  transform(buf, enc, cb) {
    cb(null, buf.toString().toUpperCase())
  },
})

process.stdin.pipe(upperCaser).pipe(process.stdout)
