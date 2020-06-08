const { createDecipheriv, createHash } = require('crypto')
const { list: tarList } = require('tar')
const { Transform } = require('stream')

const [algorithm, key, iv] = process.argv.slice(2)

process.stdin
  .pipe(createDecipheriv(algorithm, key, iv))
  .pipe(tarList())
  .on('entry', (entry) => {
    if (entry.type !== 'File') {
      return
    }
    entry
      .pipe(createHash('md5', { encoding: 'hex' }))
      .pipe(append(` ${entry.path}\n`))
      .pipe(process.stdout)
  })

function append(suffix) {
  return new Transform({
    transform(buf, enc, cb) {
      cb(null, `${buf}${suffix}`)
    },
  })
}
