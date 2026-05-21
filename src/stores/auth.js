import { defineStore } from 'pinia'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase'

// Emails des administrateurs qui peuvent modifier toutes les recettes
const ADMIN_EMAILS = [
  'francois.c.n@gmail.com',
  'karine.glandon@gmail.com'
]

const googleProvider = new GoogleAuthProvider()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => {
      if (!state.user) return false
      return ADMIN_EMAILS.includes(state.user.email)
    },
    userEmail: (state) => state.user?.email || ''
  },

  actions: {
    init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user
          this.loading = false
          resolve(user)
        })
      })
    },

    async loginWithGoogle() {
      this.error = null
      try {
        const result = await signInWithPopup(auth, googleProvider)
        this.user = result.user
      } catch (err) {
        if (err.code === 'auth/popup-closed-by-user') {
          return // user cancelled, no error
        }
        this.error = 'Erreur lors de la connexion avec Google'
        throw err
      }
    },

    async login(email, password) {
      this.error = null
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        this.user = result.user
      } catch (err) {
        this.error = 'Email ou mot de passe incorrect'
        throw err
      }
    },

    async register(email, password) {
      this.error = null
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        this.user = result.user
      } catch (err) {
        this.error = 'Erreur lors de la création du compte'
        throw err
      }
    },

    async logout() {
      await signOut(auth)
      this.user = null
    }
  }
})
