/*
  CLI script to seed products into Firestore using the Firebase Admin SDK.
  Usage:
    1) Place a service account JSON at `./serviceAccountKey.json` OR set
       the env var `GOOGLE_APPLICATION_CREDENTIALS` pointing to the JSON file.
    2) Run: `node scripts/seed-products.js`

  NOTE: This requires `firebase-admin` to be installed (dev or global):
    npm install firebase-admin
*/
import fs from 'fs'
import path from 'path'

async function main() {
  const adminModule = await import('firebase-admin')
  const admin = adminModule.default ?? adminModule

  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(process.cwd(), 'serviceAccountKey.json')

  if (!fs.existsSync(keyPath)) {
    console.error('Service account key not found. Set GOOGLE_APPLICATION_CREDENTIALS or place serviceAccountKey.json in project root.')
    process.exit(1)
  }

  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'))

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  const db = admin.firestore()

  const DEFAULT_PRODUCTS = [
    { id: 'bread', name: 'Bread', price: 1.1 },
    { id: 'milk', name: 'Milk', price: 0.5 },
    { id: 'cheese', name: 'Cheese', price: 0.9 },
    { id: 'soup', name: 'Soup', price: 0.6 },
    { id: 'butter', name: 'Butter', price: 1.2 },
  ]

  for (const p of DEFAULT_PRODUCTS) {
    const ref = db.collection('products').doc(p.id)
    await ref.set({ name: p.name, price: p.price })
    console.log('Seeded', p.id)
  }

  console.log('Seeding complete')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
