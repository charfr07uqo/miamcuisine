import { defineStore } from 'pinia'
import {
  collection, getDocs, getDoc, doc, addDoc, deleteDoc,
  query, orderBy, where, setDoc
} from 'firebase/firestore'
import { db } from '../firebase'

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recettes: [],
    ingredients: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchRecettes() {
      this.loading = true
      this.error = null
      try {
        const q = query(collection(db, 'recettes'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        this.recettes = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        }))
      } catch (err) {
        this.error = 'Erreur lors du chargement des recettes'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async fetchRecetteById(id) {
      try {
        const docRef = doc(db, 'recettes', id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) return null

        const recette = { id: docSnap.id, ...docSnap.data() }

        // Charger les ingrédients liés
        const riQuery = query(
          collection(db, 'recetteIngredients'),
          where('recetteId', '==', id)
        )
        const riSnapshot = await getDocs(riQuery)
        const ingredientLinks = riSnapshot.docs.map(d => d.data())

        // Charger les détails de chaque ingrédient
        const ingredientsDetails = await Promise.all(
          ingredientLinks.map(async (link) => {
            const ingDoc = await getDoc(doc(db, 'ingredients', link.ingredientId))
            return {
              ...link,
              ...(ingDoc.exists() ? ingDoc.data() : {}),
              ingredientId: link.ingredientId
            }
          })
        )

        recette.ingredientsDetails = ingredientsDetails
        return recette
      } catch (err) {
        console.error(err)
        return null
      }
    },

    async fetchIngredients() {
      try {
        const snapshot = await getDocs(collection(db, 'ingredients'))
        this.ingredients = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        }))
      } catch (err) {
        console.error(err)
      }
    },

    async addRecette(recette, ingredientsList) {
      try {
        // Créer la recette
        const docRef = await addDoc(collection(db, 'recettes'), {
          titre: recette.titre,
          description: recette.description,
          imageUrl: recette.imageUrl || '',
          tempsPreparation: recette.tempsPreparation || 0,
          tempsCuisson: recette.tempsCuisson || 0,
          portions: recette.portions || 4,
          difficulte: recette.difficulte || 'Facile',
          etapes: recette.etapes || [],
          authorId: recette.authorId,
          createdAt: new Date()
        })

        // Créer les liaisons ingrédients
        if (ingredientsList && ingredientsList.length > 0) {
          for (const ing of ingredientsList) {
            const linkId = `${docRef.id}_${ing.ingredientId}`
            await setDoc(doc(db, 'recetteIngredients', linkId), {
              recetteId: docRef.id,
              ingredientId: ing.ingredientId,
              quantiteValeur: ing.quantiteValeur,
              quantiteType: ing.quantiteType,
              unite: ing.unite
            })
          }
        }

        return docRef.id
      } catch (err) {
        console.error(err)
        throw err
      }
    },

    async deleteRecette(id) {
      try {
        // Supprimer les liaisons ingrédients
        const riQuery = query(
          collection(db, 'recetteIngredients'),
          where('recetteId', '==', id)
        )
        const riSnapshot = await getDocs(riQuery)
        for (const d of riSnapshot.docs) {
          await deleteDoc(d.ref)
        }

        // Supprimer la recette
        await deleteDoc(doc(db, 'recettes', id))
        this.recettes = this.recettes.filter(r => r.id !== id)
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  }
})
