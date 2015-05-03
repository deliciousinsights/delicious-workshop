Convertis les données de `process.stdin` en majuscules, pour les envoyer
ensuite vers `process.stdout`, à l’aide d’une implémentation maison de `Transform`.

Le module noyau `stream` de Node.js fournit une classe de base `Transform`. On
peut soit en hériter et implémenter sa méthode `_transform`, soit fournir au
constructeur une option `transform` de même signature. Celle-ci est :

```js
transform(buffer, encoding, callback)
```

- Le `buffer` est un `Buffer` ou une `String`, suivant les flux entrants
   transmis à ton propre transformateur.
- Si `buffer` est une `String`, `encoding` est l’encodage utilisé. En pratique,
   pour ce défi, tu n’en as pas besoin.
- Le `callback` doit être appelé avec une erreur comme argument unique (en cas
   de problème), ou avec `null` et, s’il te reste des données transformées à
   envoyer, celles-ci en deuxième argument (tu peux avoir déjà envoyé une
   pelletée de données lors de ta méthode à l’aide de `this.push(…)`, mais ce
   n’est pas obligatoire).

N’oublie pas de bien alimenter ton flux de transformation à partir de
l’entrée standard, et de consommer ses résultats avec la sortie standard, ce
qui devrait ressembler à ça :

```js
process.stdin.pipe(upperCaser).pipe(process.stdout)
```

Remarque pour finir que les blocs que tu recevras depuis `process.stdin`
sont des `Buffer`s, pas des `String`s. Tu peux appeler `buf.toString()`
sur un `Buffer` pour obtenir le texte, à partir de quoi `.toUpperCase()` est
utilisable.
