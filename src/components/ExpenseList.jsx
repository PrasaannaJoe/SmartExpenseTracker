// ExpenseList just renders each expense as a row, with a delete button.
// All the "smart" thinking happens elsewhere (BudgetSummary) —
// this component's only job is to display the raw list.
function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-message">No expenses logged yet.</p>
  }

  return (
    <ul className="expense-list">
      {expenses.map((exp) => (
        <li key={exp.id} className="expense-item">
          <div className="expense-info">
            <span className="expense-title">{exp.title}</span>
            <span className="expense-category">{exp.category}</span>
          </div>
          <div className="expense-right">
            <span className="expense-amount">₹{exp.amount.toFixed(2)}</span>
            <button className="delete-btn" onClick={() => onDelete(exp.id)}>
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList
