Ton programme recevra une _passphrase_ dans `process.argv[2]`, un
_initialization vector_ dans `process.argv[3]`, et des données encryptées
avec l’algorithme 'aes256' sur son entrée standard.

Déchiffre simplement ces données, et connecte le résultat sur
`process.stdout`.

Tu pourras utiliser l’API noyau `crypto.createDecipheriv()` pour relever ce
défi. Voici un exemple utilisant plutôt AES128, où les données en entrée sont
synthétisées de toutes pièces :

```js
const crypto = require('crypto')
const key = 'yolo vive la vie'
const iv = 'hey super michel'

const stream = crypto.createDecipheriv('AES128', key, iv)
stream.pipe(process.stdout)
stream.write(
  Buffer.from(
    `
  17 60 27 53 94 d8 23 9b 60 c1 e3 12 94 73 8c b1
  6e 05 3d d4 29 ba 5e 36 f6 73 11 14 a3 4f 64 06
    `
      .trim()
      .split(/\s+/)
      .map((s) => parseInt(s, 16))
  )
)
stream.end()
```

Au lieu d’appeler `.write()` toi-même, connecte simplement l’entrée
standard vers ton déchiffreur.
