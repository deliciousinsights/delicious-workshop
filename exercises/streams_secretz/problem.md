Tu vas recevoir, sur l’entrée standard, la version chiffrée d’un fichier
TAR compressé en GZip (comme un `.tar.gz` ou `.tgz`, si ça te parle). Pour
gagner ce défi, tu vas devoir récupérer l’archive Tar et, pour chaque
_fichier_ figurant à l‘intérieur, afficher un _hash_ MD5 hexadécimal de son
contenu, suivi d’une unique espace et du nom de fichier, puis d’un retour
chariot.

Tu recevras sur la ligne de commande le nom de l’algorithme de chiffrage
dans `process.argv[2]`, la _passphrase_ employée dans `process.argv[3]`
et le _initialization vector_ dans `process.argv[4]`.
Tu pourras passer ces arguments directement à `crypto.createDecipheriv()`.

L'API noyau zlib de Node.js te fournira `zlib.createGunzip()` pour décompresser
le flux obtenu par le déchiffrage, même si tu verras qu’un autre moyen existe en
lisant bien les docs ici et là…

Ensuite, le module `tar`, disponible sur npm, te fournit une fonction
`list()` qui produit un flux en écriture émettant un événement `'entry'` pour
chaque entité de l’archive. Une telle entité, en plus des propriétés
descriptives qu’elle possède, est aussi un flux en lecture sur le contenu
du fichier. Deux propriétés t’intéressent particulièrement :

- `entry.type` est le type d’entité (`'File'`, `'Directory'`, etc.)
- `entry.path` est le chemin associé

L’utilisation du module `tar` ressemble à ceci :

```js
const { list } = require('tar')
const parser = list()
parser.on('entry', (entry) => {
  console.dir(entry)
})

const fs = require('fs')
fs.createReadStream('file.tar').pipe(parser)
```

Pour finir, utilise l’API noyau `crypto.createHash('md5', { encoding: 'hex' })`
pour obtenir un flux qui produit le hash MD5 hexadécimal du contenu qu’on lui
écrit.

Tes compétences acquises autour de `new Transform(…)` te seront également utiles
pour avoir une solution bien orientée _pipeline_ (qui `.pipe()` dans `process.stdout`) plutôt qu’avec des `console.log()`.

Assure-toi d’avoir installé le module `tar` dans le répertoire
de ton programme, par exemple comme ceci :

    npm install tar
