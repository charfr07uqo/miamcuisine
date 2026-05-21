---
inclusion: manual
---

# Gestion des recettes - MiamCuisine

## Architecture des données

Le projet utilise Firebase Firestore avec 3 collections principales :
- `ingredients` — chaque ingrédient a un `id` (ex: `ing_tahini`), `nom`, `type` (solide/liquide), `categorie`
- `recettes` — chaque recette a un `id` (ex: `rec_biscuits_tahini_dattes`), `titre`, `description`, `imageUrl`, `categorie`, `tempsPreparation`, `tempsCuisson`, `portions`, `difficulte`, `notes`, `etapes[]`, `authorId`, `createdAt`
- `recetteIngredients` — liaisons avec `recetteId`, `ingredientId`, `quantiteValeur`, `quantiteType` (volume/poids/unite), `unite`

## Fichiers à modifier pour ajouter une recette

1. **`seed.js`** — Source de vérité pour toutes les données :
   - Ajouter les nouveaux ingrédients dans `ingredients2` (avec id `ing_xxx`)
   - Ajouter la recette dans le tableau `recettes` (avec id `rec_xxx`)
   - Ajouter les liaisons dans `recetteIngredients3` (docId = `recetteId_ingredientId`)
   - **IMPORTANT** : Toujours inclure `imageUrl` si une image existe (format : `/images/recettes/nom-fichier.png`)

2. **`Recettes.md`** — Documentation markdown des recettes :
   - Ajouter un lien dans la table des matières en haut
   - Ajouter la section complète de la recette à la fin (avant toute référence d'image)
   - **NE PAS** inclure d'images base64 dans ce fichier

3. **`public/images/recettes/`** — Images des recettes :
   - Placer l'image ici avec un nom en kebab-case (ex: `biscuits-tahini-dattes.jpg`)
   - Formats acceptés : `.jpg`, `.png`

## Procédure de déploiement (seed)

Les règles Firestore exigent une authentification pour écrire. Le seed utilise le SDK client sans auth.

### Étapes pour seeder :

1. Créer un fichier temporaire `firestore.rules.temp` avec des règles ouvertes :
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

2. Modifier `firebase.json` pour pointer vers `firestore.rules.temp` :
```json
"rules": "firestore.rules.temp",
```

3. Déployer les règles temporaires :
```
firebase deploy --only firestore:rules
```

4. Exécuter le seed :
```
node seed.js
```

5. Remettre `firebase.json` vers les règles sécurisées :
```json
"rules": "firestore.rules",
```

6. Re-déployer les règles sécurisées :
```
firebase deploy --only firestore:rules
```

7. Supprimer `firestore.rules.temp`

### Vérification avant seed :
- `node --check seed.js` pour valider la syntaxe
- Vérifier que chaque recette avec une image a bien son `imageUrl` renseigné
- Le seed ÉCRASE toutes les données existantes (setDoc), donc les `imageUrl` vides effacent les images précédemment configurées

## Conventions

- IDs ingrédients : `ing_` + nom en snake_case (ex: `ing_poudre_amandes`)
- IDs recettes : `rec_` + nom en snake_case (ex: `rec_biscuits_tahini_dattes`)
- Images : nom en kebab-case dans `/public/images/recettes/`
- `authorId` par défaut : `user_francois`
- `createdAt` : date de création au format `new Date('YYYY-MM-DD')`

## Projet Firebase

- Projet : `miamcuisine-app`
- Compte connecté : `francois.c.n@gmail.com` (admin)
- Firebase CLI doit être connecté (`firebase login:list` pour vérifier)
