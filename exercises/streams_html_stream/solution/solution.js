const { Transform } = require('stream')
const trumpet = require('trumpet')

const tr = trumpet()

process.stdin.pipe(tr).pipe(process.stdout)

// Variante « première occurrence seulement » :

const hook = tr.select('.loud').createStream()
hook.pipe(upperCaser()).pipe(hook)

// Variante « toutes les occurrences » :

tr.selectAll('.loud', (element) => {
  const hook = element.createStream()
  hook.pipe(upperCaser()).pipe(hook)
})

// L’utilitaire de création de flux de transfo majuscule :

const upperCaser = () => new Transform({
  transform(buf, enc, cb) {
    cb(null, buf.toString().toUpperCase())
  },
})
