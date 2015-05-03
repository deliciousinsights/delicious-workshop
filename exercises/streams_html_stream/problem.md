Votre programme va récupérer du HTML sur l’entrée standard.  Convertissez en
majuscules le HTML à l’intérieur de tout élément doté d’une classe CSS `"loud"`
(qui n’est pas forcément la seule classe de l’élément).

Vous allez utiliser les modules `trumpet` et `through2` pour réussir cette
aventure.

Avec `trumpet`, vous pouvez créer des flux de transformation attachés à des
sélecteurs CSS :

    var trumpet = require('trumpet');
    var fs = require('fs');
    var tr = trumpet();
    fs.createReadStream('input.html').pipe(tr);

    var stream = tr.select('.beep').createStream();

À présent, `stream` va émettre les contenus HTML de tous les éléments dotés
d’au moins la classe CSS `"beep"`, et ce que vous y écrirez en retour deviendra
le HTML de remplacement (à défaut, aucune transformation ne sera appliquée).

Assurez-vous d’avoir installé les modules `trumpet` et `through2` dans le
répertoire de votre programme, par exemple comme ceci :

    npm install trumpet through2
