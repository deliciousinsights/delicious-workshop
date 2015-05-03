Ton programme va récupérer du HTML sur l’entrée standard. Convertis en
majuscules le HTML à l’intérieur de tout élément doté d’une classe CSS `"loud"`
(qui n’est pas forcément la seule classe de l’élément).

Tu vas utiliser le module `trumpet` pour réussir cette aventure.

Avec `trumpet`, tu peux créer des flux de transformation attachés à des
sélecteurs CSS :

```js
const fs = require('fs')
fs.createReadStream('input.html').pipe(tr)

const trumpet = require('trumpet')
const tr = trumpet()

const hook = tr.select('.beep').createStream()
```

À présent, `stream` va émettre les contenus HTML de tous les éléments dotés
d’au moins la classe CSS `"beep"`, et ce que tu y écriras en retour deviendra
le HTML de remplacement (à défaut, aucune transformation ne sera appliquée).

Assure-toi d’avoir installé le module `trumpet` dans le
répertoire de ton programme, par exemple comme ceci :

    npm install trumpet
