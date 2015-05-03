Ton programme recevra une _passphrase_ dans `process.argv[2]`, et
des données encryptées avec l’algorithme 'aes256' sur son entrée standard.

Déchiffre simplement ces données, et connecte le résultat sur
`process.stdout`.

Tu pourras utiliser l’API noyau `crypto.createDecipher()` pour relever ce
défi. Voici un exemple, où les données en entrée sont synthétisées de toutes pièces :

```js
const crypto = require('crypto')
const stream = crypto.createDecipher('RC4', 'robots')
stream.pipe(process.stdout)
stream.write(new Buffer([135, 197, 164, 92, 129, 90, 215, 63, 92]))
stream.end()
```

Au lieu d’appeler `.write()` toi-même, connecte simplement l’entrée
standard vers ton déchiffreur.
