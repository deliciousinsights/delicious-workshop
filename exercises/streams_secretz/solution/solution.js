const { createDecipher, createHash } = require('crypto')
const { list: tarList } = require('tar')
const { Transform } = require('stream')

process.stdin
  .pipe(createDecipher(process.argv[2], process.argv[3]))
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
