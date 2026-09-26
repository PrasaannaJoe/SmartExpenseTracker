# Smart Expense Tracker — React Project

Log your daily expenses and get instant, rule-based insights: how much
budget is left, a progress bar, a warning when you're close to (or
over) your limit, and which category you're spending the most on.

"Smart" here doesn't mean AI — it means the app calculates and reacts
to your data instead of just displaying it. That's a very common,
very hireable skill.



## Project structure

```
smart-expense-tracker/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx                    # Holds expenses + budget state
│   ├── App.css
│   └── components/
│       ├── ExpenseForm.jsx        # Add an expense (title, amount, category)
│       ├── ExpenseList.jsx        # Displays the logged expenses
│       └── BudgetSummary.jsx      # THE SMART PART — see below
```

## Where the "smart" logic lives: `BudgetSummary.jsx`

This one file does all the thinking:

1. **`reduce()`** adds up every expense into a single total.
2. A loop groups expenses by category into a plain object, like:
   ```js
   { Food: 850, Travel: 400, Bills: 1200 }
   ```
   then finds whichever category has the highest total.
3. An `if / else if` chain checks the percentage of budget used and
   picks one of three "alert levels": `ok`, `warning`, or `danger` —
   each with its own message and progress bar color.

This is the same basic pattern used in real dashboards: **take raw
data → derive numbers from it → decide what to show the user based
on those numbers.**

## Ideas to extend it

- Persist expenses in `localStorage` so they survive a refresh.
- Add a date to each expense and filter by "This month".
- Break totals down by category with a simple bar chart.
- Add category-wise budgets, not just one overall budget.

Read `BudgetSummary.jsx` first — it's the most interesting file. Then
`App.jsx` to see how state is shared across components.
