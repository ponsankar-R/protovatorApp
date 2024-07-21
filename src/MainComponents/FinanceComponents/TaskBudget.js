import React, { useState, useEffect } from 'react';
import './TaskBudget.css';

export default function TaskBudget() {
  const [taskBudgetTransaction, setTaskBudgetTransaction] = useState({
    taskBudgetTransactionName: '',
    taskBudgetAmount: '',
    taskBudgetType: 'income'
  });

  const [taskBudgetTransactionsList, setTaskBudgetTransactionsList] = useState([]);
  const [taskBudgetMonthTransTotal, setTaskBudgetMonthTransTotal] = useState(0); // State for total amount

  useEffect(()=>{
    localStorage.setItem("TaskTotal",taskBudgetMonthTransTotal)
  },[taskBudgetMonthTransTotal])
  useEffect(() => {
    // Load transactions from local storage on component mount
    const storedTaskBudgetTransactions = JSON.parse(localStorage.getItem('taskBudgetTransactions')) || [];
    if (storedTaskBudgetTransactions.length > 0) {
      setTaskBudgetTransactionsList(storedTaskBudgetTransactions);
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever transactionsList changes
    localStorage.setItem('taskBudgetTransactions', JSON.stringify(taskBudgetTransactionsList));

    // Recalculate total whenever transactionsList changes
    calculateTaskBudgetTotal(taskBudgetTransactionsList);
  }, [taskBudgetTransactionsList]);

  const handleTaskBudgetChange = (e) => {
    const { name, value } = e.target;
    setTaskBudgetTransaction({ ...taskBudgetTransaction, [name]: value });
  };

  const handleTaskBudgetSubmit = () => {
    // Add current transaction to the list
    const newTaskBudgetTransaction = { ...taskBudgetTransaction };
    setTaskBudgetTransactionsList([...taskBudgetTransactionsList, newTaskBudgetTransaction]);
    
    // Reset form after submission
    setTaskBudgetTransaction({ taskBudgetTransactionName: '', taskBudgetAmount: '', taskBudgetType: 'income' });
  };

  const handleTaskBudgetDelete = (index) => {
    // Create a copy of the transactions list
    const updatedTaskBudgetTransactions = [...taskBudgetTransactionsList];
    // Remove the transaction at the specified index
    updatedTaskBudgetTransactions.splice(index, 1);
    // Update state with the updated list
    setTaskBudgetTransactionsList(updatedTaskBudgetTransactions);
  };

  const calculateTaskBudgetTotal = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((trans) => {
      if (trans.taskBudgetType === 'income') {
        totalIncome += parseFloat(trans.taskBudgetAmount);
      } else if (trans.taskBudgetType === 'expense') {
        totalExpense += parseFloat(trans.taskBudgetAmount);
      }
    });

    const monthTotal = totalIncome - totalExpense;
    setTaskBudgetMonthTransTotal(monthTotal);
  };

  return (
    <div id="TaskBudgetComponent"> 
      <div id="TaskBudgetInputs">
        <h5 id="TaskBudgetTransNLabel">Transaction Name:</h5>
        <input
          id="TaskBudgetTransName"
          name="taskBudgetTransactionName"
          type='text'
          placeholder='Enter Transaction Name'
          value={taskBudgetTransaction.taskBudgetTransactionName}
          onChange={handleTaskBudgetChange}
          required
          maxLength={18}
        />
        <h5 id="TaskBudgetTransALabel">Amount:</h5>
        <input
          id="TaskBudgetTransAmount"
          name="taskBudgetAmount"
          type='number'
          placeholder='Enter Amount in ₹INR'
          value={taskBudgetTransaction.taskBudgetAmount}
          onChange={handleTaskBudgetChange}
          required
          maxLength={15}
        />
        <div id="TaskBudgetRadioButtons">
          <label>
            <input
              type='radio'
              name='taskBudgetType'
              value='income'
              checked={taskBudgetTransaction.taskBudgetType === 'income'}
              onChange={handleTaskBudgetChange}
            />
            Income
          </label>
          <label>
            <input
              type='radio'
              name='taskBudgetType'
              value='expense'
              checked={taskBudgetTransaction.taskBudgetType === 'expense'}
              onChange={handleTaskBudgetChange}
            />
            Expense
          </label>
        </div>
        <div id="TaskBudgetAddBox">
          <button id="TaskBudgetAddButton" onClick={handleTaskBudgetSubmit}>ADD</button>
        </div>
      </div>

      {/* Display total */}
      <div id="TaskBudgetTransTotal">
        <h3>Total: ₹{taskBudgetMonthTransTotal}</h3>
      </div>

      {/* Render stored transactions */}
      <div id="StoredTaskBudgetTransactions">
  <h2>Transactions:</h2>
  <ul id="TaskBudgetTransactionsList">
    {taskBudgetTransactionsList.map((trans, index) => (
      <li key={index} className="taskBudgetTransContainer">
        <strong className="taskBudgetTransName">{trans.taskBudgetTransactionName}</strong>
        {trans.taskBudgetType === 'income' ? (
          <div className="taskBudgetTransIncAmount">+{trans.taskBudgetAmount}</div>
        ) : (
          <div className="taskBudgetTransExpAmount">-{trans.taskBudgetAmount}</div>
        )}
        {trans.taskBudgetType === 'income' ? (
          <div className="taskBudgetTransInc">Income</div>
        ) : (
          <div className="taskBudgetTransExp">Expense</div>
        )}
        <button className="taskBudgetTransDelete" onClick={() => handleTaskBudgetDelete(index)}>X</button>
      </li>
    ))}
  </ul>
</div>


    </div>
  );
}
