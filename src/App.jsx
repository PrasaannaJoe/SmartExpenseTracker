import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import BudgetSummary from './components/BudgetSummary.jsx'

function App() {
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget] = useState(5000) // default monthly budget in ₹
  const [budgetInput, setBudgetInput] = useState('5000')

  function addExpense(expense) {
    setExpenses([expense, ...expenses]) // newest expense shows first
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((exp) => exp.id !== id))
  }

  function handleBudgetChange(e) {
    setBudgetInput(e.target.value)
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setBudget(value)
    }
  }

  return (
    <div className="app">
      <h1>💰 Smart Expense Tracker</h1>
      <p className="subtitle">Log expenses and get instant budget insights</p>

      <div className="budget-input-row">
        <label htmlFor="budget">Monthly budget (₹)</label>
        <input
          id="budget"
          type="number"
          value={budgetInput}
          onChange={handleBudgetChange}
          min="0"
        />
      </div>

      {/* This is the "smart" piece — it reads the expenses + budget
          and works out totals, warnings, and the top spending category. */}
      <BudgetSummary expenses={expenses} budget={budget} />

      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  )
}

export default App
