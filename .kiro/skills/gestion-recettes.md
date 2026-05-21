---
inclusion: manual
---

# Gestion des recettes - MiamCuisine

## Architecture des données

Le projet utilise Firebase Firestore avec 3 collections principales :
- `ingredients` — chaque ingrédient a un `id` (ex: `ing_tahini`), `nom`, `type` (solide/liquide), `categorie`
- `recettes` — chaque recette a un `id` (ex: `rec_biscuits_tahini_dattes`), `titre`, `description`, `imageUrl`, `categorie`, `tempsPreparation`, `tempsCuisson`, `portions`, `difficulte`, `notes`, `etapes[]`, `authorId`, `createdAt`
- `recetteIngredients` — liaisons avec `recetteId`, `ingredientId`, `quantiteValeur`, `quantiteType` (volume/poids/unite), `unite`

## Ajouter une recette — Checklist

### Fichiers à modifier

1. **`seed.js`** — Source de vérité pour toutes les données :
   - Ajouter les nouveaux ingrédients dans `ingredients2` (avec id `ing_xxx`)
   - Ajouter la recette dans le tableau `recettes` (avec id `rec_xxx`)
   - Ajouter les liaisons dans `recetteIngredients3` (docId = `recetteId_ingredientId`)
   - **TOUJOURS** inclure `imageUrl` si une image existe

2. **`Recettes.md`** — Documentation markdown des recettes :
   - Ajouter un lien dans la table des matières en haut
   - Ajouter la section complète de la recette à la fin (avant toute référence d'image s'il en reste)
   - **NE PAS** inclure d'images base64 dans ce fichier

3. **`public/images/recettes/`** — Images des recettes :
   - Placer l'image ici

### Règles CRITIQUES pour les images

- **PAS D'ESPACES** dans les noms de fichiers images. Firebase Hosting ne sert pas les fichiers avec espaces.
- Utiliser le format kebab-case : `biscuits-tahini-dattes.jpg` ✅ et non `biscuit tahini.jpg` ❌
- Si l'utilisateur fournit une image avec un espace dans le nom, la renommer immédiatement.
- Format du chemin dans `imageUrl` : `/images/recettes/nom-en-kebab-case.ext`
- Formats acceptés : `.jpg`, `.png`

## Procédure de déploiement

### Étape 1 : Seed Firestore

Les règles Firestore exigent une authentification. Le seed utilise le SDK client sans auth. Il faut temporairement ouvrir les règles.

1. Créer `firestore.rules.temp` :
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

2. Dans `firebase.json`, changer `"rules": "firestore.rules"` → `"rules": "firestore.rules.temp"`

3. `firebase deploy --only firestore:rules`

4. **Attendre ~5 secondes** pour la propagation des règles

5. `node seed.js`

6. Remettre `firebase.json` → `"rules": "firestore.rules"`

7. `firebase deploy --only firestore:rules`

8. Supprimer `firestore.rules.temp`

### Étape 2 : Déployer le hosting (pour les images)

```
npm run build
firebase deploy --only hosting
```

### Alternative pour un update ciblé (sans full seed)

Pour modifier un seul champ d'une recette existante, créer un script temporaire :
```js
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { config } from 'dotenv'
config()
const app = initializeApp({ /* env vars */ })
const db = getFirestore(app)
async function update() {
  await updateDoc(doc(db, 'recettes', 'rec_xxx'), { imageUrl: '/images/recettes/xxx.jpg' })
  console.log('Done')
  process.exit(0)
}
update().catch(e => { console.error(e); process.exit(1) })
```
Nécessite aussi les règles ouvertes temporairement.

## Conventions

- IDs ingrédients : `ing_` + nom en snake_case (ex: `ing_poudre_amandes`)
- IDs recettes : `rec_` + nom en snake_case (ex: `rec_biscuits_tahini_dattes`)
- Images : **kebab-case, SANS ESPACES** dans `/public/images/recettes/`
- `authorId` par défaut : `user_francois`
- `createdAt` : `new Date('YYYY-MM-DD')`
- Le seed ÉCRASE toutes les données (setDoc) — s'assurer que TOUTES les recettes ont leur `imageUrl` renseigné dans seed.js

## Projet Firebase

- Projet : `miamcuisine-app`
- URL : https://miamcuisine-app.web.app
- Compte : `francois.c.n@gmail.com` (admin)
- Vérifier connexion : `firebase login:list`
