import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { saveBasket } from '../services'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const basket = useSelector((s: RootState) => s.basket.items)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  async function handleSave() {
    try {
      setSaving(true)
      await saveBasket(basket)
      navigate('/saved')
    } catch (err) {
      console.error('saveBasket error', err)
      alert('Failed to save basket: ' + String(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b">
      <h3 className="text-xl font-semibold tracking-wide">🧾 Billing Dashboard</h3>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          {saving ? 'Saving…' : 'Save basket'}
        </button>

        <span className="text-gray-700">Welcome, User</span>
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          U
        </div>
      </div>
    </div>
  )
}
