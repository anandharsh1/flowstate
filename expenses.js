let totalExpenses = 0;

function addExpense() {
  const daily = parseFloat(document.getElementById('dailyExpense').value);
  const budget = parseFloat(document.getElementById('monthlyBudget').value);
  const summary = document.getElementById('expenseSummary');

  if (isNaN(daily) || isNaN(budget)) {
    summary.textContent = "Please enter valid numbers.";
    return;
  }

  totalExpenses += daily;
  const remaining = budget - totalExpenses;

  summary.innerHTML = `
    Total Spent: ₹${totalExpenses.toFixed(2)}<br>
    Remaining Budget: ₹${remaining.toFixed(2)}
  `;

  document.getElementById('dailyExpense').value = '';
}
