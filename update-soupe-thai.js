import { initializeApp } from 'firebase/app'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { config } from 'dotenv'
config()
const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
})
const db = getFirestore(app)
async function update() {
  await updateDoc(doc(db, 'recettes', 'rec_soupe_thailandaise'), {
    imageUrl: '/images/recettes/soupe-thailandaise.png'
  })
  console.log('Done')
  process.exit(0)
}
update().catch(e => { console.error(e); process.exit(1) })
