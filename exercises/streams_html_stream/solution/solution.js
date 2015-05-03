const { Transform } = require('stream')
const trumpet = require('trumpet')

const tr = trumpet()

process.stdin.pipe(tr).pipe(process.stdout)

const hook = tr.select('.loud').createStream()
const upperCaser = new Transform({
  transform(buf, enc, cb) {
    cb(null, buf.toString().toUpperCase())
  },
})

hook.pipe(upperCaser).pipe(hook)
