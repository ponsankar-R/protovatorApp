import React, { useEffect, useState } from 'react';
import './Finance.css';
import Agreement from './FinanceComponents/Agreement';
import TotalNetWorth from './FinanceComponents/TotalNetWorth';
import TaskBudget from './FinanceComponents/TaskBudget';
import MonthlyBudget from './FinanceComponents/MonthlyBudget';
import YearlyBudget from './FinanceComponents/YearlyBudget';
function Finance() {
  const [agreement, setAgreement] = useState(0); // state variable for handling agreement
  const [dashboard, setDashboard] = useState(0); // managing component to be rendered

  useEffect(() => {
    // For ensuring user accepted to continue
    setAgreement(localStorage.getItem("Agreement") || 0);
  }, []);

  const handleNetWorth = () => {
    setDashboard(1);
  };

  const handleTaskBudget = () => {
    setDashboard(2);
  };

  const handleMonthlyBudget = () => {
    setDashboard(3);
  };

  const handleYearlyBudget = () => {
    setDashboard(4);
  };

  const handleBack=()=>{
    setDashboard(0);
  }

  return (
    <div>
    
      {dashboard ? (
        <div>
        <button id="FinBack" onClick={handleBack}>Back</button>
          {dashboard === 1 ? (
            <TotalNetWorth />
          ) : dashboard === 2 ? (
            <TaskBudget />
          ) : dashboard === 3 ? (
            <MonthlyBudget />
          ) : dashboard === 4 ? (
            <YearlyBudget />
          ) : (
            <div>404 Error!</div>
          )}
        </div>
      ) : (
        <div>
          {agreement ? (
            <div id="FinanceDashboard">
              <h1 id="DashboardGreet">Welcome to Protovator Financial Management ~</h1>
              <div id="FinComponents">
                <div id="TotalNetWorth" className='DashboardComponents' onClick={handleNetWorth}>Total Net Worth</div>
                <div id="TaskBudget" className='DashboardComponents' onClick={handleTaskBudget}>Task Budget </div>
                <div id="MonthlyBudget" className='DashboardComponents' onClick={handleMonthlyBudget}>Monthly Budget</div>
                <div id="YearlyBudget" className='DashboardComponents' onClick={handleYearlyBudget}>Yearly Budget</div>
              </div>
            </div>
          ) : (
            <div>
              <Agreement setAgreement={setAgreement} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Finance;
