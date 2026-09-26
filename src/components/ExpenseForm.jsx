import { useState } from 'react'

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Other']

// ExpenseForm collects one new expense (title, amount, category)
// and hands it up to App.jsx via the "onAdd" function.
function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])

  function handleSubmit(e) {
    e.preventDefault()

    const numericAmount = parseFloat(amount)
    // Basic validation: need a title and a valid positive number
    if (title.trim() === '' || isNaN(numericAmount) || numericAmount <= 0) {
      return
    }

    onAdd({
      id: Date.now(),
      title: title.trim(),
      amount: numericAmount,
      category,
    })

    // Reset the form for the next entry
    setTitle('')
    setAmount('')
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What did you spend on?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
        step="0.01"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  )
}

export default ExpenseForm
export { CATEGORIES }
