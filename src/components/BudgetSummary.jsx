// This is the "smart" part of the app. It doesn't just display raw
// numbers — it CALCULATES insights from the expense list:
//   1. Total spent so far
//   2. How much of the budget is left
//   3. Which category the user is spending the most on
//   4. A contextual warning message based on how close they are
//      to their budget limit
//
// All of this logic lives in one place, so App.jsx just passes in
// data and this component figures out what to say.
function BudgetSummary({ expenses, budget }) {
  // reduce() walks through the array and builds up a single total —
  // a very common pattern once you're past the basics.
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const remaining = budget - totalSpent
  const percentUsed = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0

  // Group spending by category using an object as a "bucket" for each category,
  // then find whichever bucket is largest.
  const totalsByCategory = {}
  for (const exp of expenses) {
    totalsByCategory[exp.category] = (totalsByCategory[exp.category] || 0) + exp.amount
  }
  let topCategory = null
  let topAmount = 0
  for (const [category, amount] of Object.entries(totalsByCategory)) {
    if (amount > topAmount) {
      topCategory = category
      topAmount = amount
    }
  }

  // Decide which alert to show based on simple thresholds.
  // This "if this, else if that" chain is the core of the "smart" behavior —
  // no AI needed, just clear rules applied to the data.
  let alertLevel = 'ok'
  let alertMessage = "You're within budget. Nice work!"
  if (totalSpent > budget) {
    alertLevel = 'danger'
    alertMessage = `You've gone over budget by ₹${(totalSpent - budget).toFixed(2)}.`
  } else if (percentUsed >= 80) {
    alertLevel = 'warning'
    alertMessage = `Heads up — you've used ${percentUsed.toFixed(0)}% of your budget.`
  }

  return (
    <div className="budget-summary">
      <div className="summary-row">
        <span>Total spent</span>
        <strong>₹{totalSpent.toFixed(2)}</strong>
      </div>
      <div className="summary-row">
        <span>Budget remaining</span>
        <strong className={remaining < 0 ? 'negative' : ''}>
          ₹{remaining.toFixed(2)}
        </strong>
      </div>

      {/* A simple progress bar — width is driven directly by percentUsed */}
      <div className="progress-track">
        <div
          className={`progress-fill ${alertLevel}`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <p className={`alert-message ${alertLevel}`}>{alertMessage}</p>

      {topCategory && (
        <p className="top-category">
          Biggest spend: <strong>{topCategory}</strong> (₹{topAmount.toFixed(2)})
        </p>
      )}
    </div>
  )
}

export default BudgetSummary
