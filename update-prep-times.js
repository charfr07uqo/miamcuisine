/**
 * Met à jour le temps de préparation à 30 min pour :
 * - Brochettes de poulet à l'ananas
 * - Bœuf aux brocolis
 * - Bœuf Basilic Thaï
 *
 * Usage: node update-prep-times.js
 * Nécessite FIREBASE_EMAIL et FIREBASE_PASSWORD dans .env (un compte admin)
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { config } from 'dotenv'

config()

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const updates = [
  { id: 'rec_brochettes_poulet_ananas', titre: 'Brochettes poulet ananas' },
  { id: 'rec_boeuf_brocoli', titre: 'Bœuf aux brocolis' },
  { id: 'rec_boeuf_basilic_thai', titre: 'Bœuf Basilic Thaï' },
]

async function main() {
  const email = process.env.FIREBASE_EMAIL
  const password = process.env.FIREBASE_PASSWORD

  if (!email || !password) {
    console.error('Ajoute FIREBASE_EMAIL et FIREBASE_PASSWORD dans .env (un compte admin)')
    process.exit(1)
  }

  console.log(`Connexion avec ${email}...`)
  await signInWithEmailAndPassword(auth, email, password)
  console.log('Connecté!\n')

  for (const { id, titre } of updates) {
    await updateDoc(doc(db, 'recettes', id), { tempsPreparation: 30 })
    console.log(`✓ ${titre} → tempsPreparation: 30`)
  }

  console.log('\nTerminé!')
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
