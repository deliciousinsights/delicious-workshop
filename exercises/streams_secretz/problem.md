Vous allez recevoir, sur l’entrée standard, la version cryptée d’un fichier
TAR compressé en GZip (comme un `.tar.gz` ou `.tgz`, si ça vous parle).  Pour
gagner ce défi, vous allez devoir récupérer l’archive Tar et, pour chaque
*fichier* figurant à l‘intérieur, afficher un *hash* MD5 hexadécimal de son
contenu, suivi d’une unique espace et du nom de fichier, puis d’un retour
chariot.

Vous recevrez sur la ligne de commande le nom de l’algorithme cryptographique
dans `process.argv[2]`, et la *passphrase* de cryptage dans `process.argv[3]`.
Vous pourrez passer ces arguments directement à `crypto.createDecipher()`.

L'API noyau zlib de Node.js vous fournira `zlib.createGunzip()` pour décompresser
le flux obtenu par le décryptage.

Ensuite, le module `tar`, disponible sur npm, vous fournit une fonction
`tar.Parse()` qui est un flux en écriture émettant un événement `'entry'` pour
chaque entité de l’archive.  Une telle entité, en plus des propriétés
descriptives qu’elle possède, est aussi un flux en lecture sur le contenu
du fichier.  Deux propriétés vous intéressent particulièrement :

- `entry.type` est le type d’entité (`'File'`, `'Directory'`, etc.)
- `entry.path` est le chemin associé

L’utilisation du module `tar` ressemble à ceci :

    var tar = require('tar');
    var parser = tar.Parse();
    parser.on('entry', function (e) {
        console.dir(e);
    });
    var fs = require('fs');
    fs.createReadStream('file.tar').pipe(parser);

Pour finir, utilisez l’API noyau `crypto.createHash('md5', { encoding: 'hex' })`
pour obtenir un flux qui produit le hash MD5 hexadécimal du contenu qu’on lui
écrit.

Le module `through` vous sera également utile si vous voulez une solution
bien orientée *pipeline* (qui `.pipe()` dans `process.stdout`) plutôt qu’avec
des `console.log()`.

Assurez-vous d’avoir installé les modules `tar` et `through2` dans le répertoire
de votre programme, par exemple comme ceci :

    npm install tar through2
