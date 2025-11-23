import { ensureFirestore } from '../firebase'

export async function saveBasket(basket: Record<string, number>) {
  const db = await ensureFirestore()
  const { collection, addDoc } = await import('firebase/firestore')
  const docRef = await addDoc(collection(db, 'baskets'), {
    basket,
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}

export async function loadLatestBasket() {
  const db = await ensureFirestore()
  const { collection, query, orderBy, limit, getDocs } = await import('firebase/firestore')
  const q = query(collection(db, 'baskets'), orderBy('createdAt', 'desc'), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return snap.docs[0].data()
}

export async function saveProducts(products: { id: string; name: string; price: number }[]) {
  const db = await ensureFirestore()
  const { doc, setDoc } = await import('firebase/firestore')
  const results: string[] = []
  for (const p of products) {
    const ref = doc(db, 'products', p.id)
    await setDoc(ref, { name: p.name, price: p.price })
    results.push(p.id)
  }
  return results
}

export async function loadProducts() {
  const db = await ensureFirestore()
  const { collection, getDocs } = await import('firebase/firestore')
  const snap = await getDocs(collection(db, 'products'))
  const out: { id: string; name: string; price: number }[] = []
  snap.forEach((d: any) => {
    const data = d.data() as any
    out.push({ id: d.id, name: data.name, price: Number(data.price) })
  })
  return out
}

export async function loadBaskets() {
  const db = await ensureFirestore()
  const { collection, getDocs, query, orderBy } = await import('firebase/firestore')
  const q = query(collection(db, 'baskets'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  const out: { id: string; basket: Record<string, number>; createdAt: string }[] = []
  snap.forEach((d: any) => {
    const data = d.data() as any
    out.push({ id: d.id, basket: data.basket || {}, createdAt: data.createdAt || '' })
  })
  return out
}

export const seedDefaultProducts = saveProducts
export const fetchProducts = loadProducts
