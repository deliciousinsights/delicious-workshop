Votre programme recevra une *passphrase* dans `process.argv[2]`, et
des données encryptées avec l’algorithme 'aes256' sur son entrée standard.

Décryptez simplement ces données, et connectez le résultat sur
`process.stdout`.

Vous pouvez utiliser l’API noyau `crypto.createDecipher()` pour relever ce
défi.  Voici un exemple :

    var crypto = require('crypto');
    var stream = crypto.createDecipher('RC4', 'robots');
    stream.pipe(process.stdout);
    stream.write(Buffer([ 135, 197, 164, 92, 129, 90, 215, 63, 92 ]));
    stream.end();

Au lieu d’appeler `.write()` vous-mêmes, connectez simplement l’entrée
standard vers votre décrypteur.
