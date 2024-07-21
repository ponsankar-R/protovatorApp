import React from 'react';
import './TotalNetWorth.css'; // Import CSS for styling

export default function TotalNetWorth() {
  let monthlyTotal=localStorage.getItem("MonthTotal");
  let yearlyTotal=localStorage.getItem("YearTotal");
  let taskBudgetTotal=localStorage.getItem("TaskTotal")

  return (
    <div className="total-net-worth-container">
      <div className="net-worth-row">
        <h3 className="component-name">Monthly Budget</h3>
        <div className="total-transactions">₹{monthlyTotal}</div>
      </div>
      <div className="net-worth-row">
        <h3 className="component-name">Yearly Budget</h3>
        <div className="total-transactions">₹{yearlyTotal}</div>
      </div>
      <div className="net-worth-row">
        <h3 className="component-name">Task Budget</h3>
        <div className="total-transactions">₹{taskBudgetTotal}</div>
      </div>
    </div>
  );
}
