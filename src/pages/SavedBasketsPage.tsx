import { useEffect, useState } from 'react'
import { loadBaskets } from '../services'

type SavedBasket = {
  id: string
  basket: Record<string, number>
  createdAt: string
}

export default function SavedBasketsPage() {
  const [items, setItems] = useState<SavedBasket[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    loadBaskets()
      .then((rows) => {
        if (!mounted) return
        setItems(rows)
      })
      .catch((err) => console.error('loadBaskets', err))
      .finally(() => setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved Baskets</h2>
      {loading && <div className="text-gray-500">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-500">
                {s.createdAt ? new Date(s.createdAt).toLocaleString() : 'Unknown'}
              </div>
              <div className="text-xs text-gray-400">id: {s.id}</div>
            </div>

            <div className="space-y-2">
              {Object.entries(s.basket).length === 0 && (
                <div className="text-sm text-gray-500">(empty)</div>
              )}
              {Object.entries(s.basket).map(([pid, qty]) => (
                <div key={pid} className="flex justify-between text-sm">
                  <div className="font-medium">{pid}</div>
                  <div className="text-gray-600">x{qty}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
