import React, { useState, useEffect } from 'react';
import './MonthlyBudget.css';

export default function MonthlyBudget() {
  const [transaction, setTransaction] = useState({
    TransactionName: '',
    Amount: '',
    Type: 'income'
  });

  const [transactionsList, setTransactionsList] = useState([]);
  const [MonthTransTotal, setMonthTransTotal] = useState(0); // State for total amount

   
  useEffect(()=>{
    localStorage.setItem("MonthTotal",MonthTransTotal)
  },[MonthTransTotal])
  useEffect(() => {
    // Load transactions from local storage on component mount
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    if (storedTransactions.length > 0) {
      setTransactionsList(storedTransactions);
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever transactionsList changes
    localStorage.setItem('transactions', JSON.stringify(transactionsList));

    // Recalculate total whenever transactionsList changes
    calculateTotal(transactionsList);
  }, [transactionsList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = () => {
    // Add current transaction to the list
    const newTransaction = { ...transaction };
    setTransactionsList([...transactionsList, newTransaction]);
    
    // Reset form after submission
    setTransaction({ TransactionName: '', Amount: '', Type: 'income' });
  };

  const handleDelete = (index) => {
    // Create a copy of the transactions list
    const updatedTransactions = [...transactionsList];
    // Remove the transaction at the specified index
    updatedTransactions.splice(index, 1);
    // Update state with the updated list
    setTransactionsList(updatedTransactions);
  };

  const calculateTotal = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((trans) => {
      if (trans.Type === 'income') {
        totalIncome += parseFloat(trans.Amount);
      } else if (trans.Type === 'expense') {
        totalExpense += parseFloat(trans.Amount);
      }
    });

    const monthTotal = totalIncome - totalExpense;
    setMonthTransTotal(monthTotal);
  };

  return (
    <div id="MonthlyBudgetComponent"> 
      <div id="MonthlyBudgetInputs">
        <h5 id="MonthTransNLabel">Transaction Name:</h5>
        <input
          id="MonthTransName"
          name="TransactionName"
          type='text'
          placeholder='Enter Transaction Name'
          value={transaction.TransactionName}
          onChange={handleChange}
          required
          maxLength={18}
        />
        <h5 id="MonthTransALabel">Amount:</h5>
        <input
          id="MonthTransAmount"
          name="Amount"
          type='number'
          placeholder='Enter Amount in ₹INR'
          value={transaction.Amount}
          onChange={handleChange}
          required
          maxLength={15}
        />
        <div id="MonthRadioButtons">
          <label>
            <input
              type='radio'
              name='Type'
              value='income'
              checked={transaction.Type === 'income'}
              onChange={handleChange}
            />
            Income
          </label>
          <label>
            <input
              type='radio'
              name='Type'
              value='expense'
              checked={transaction.Type === 'expense'}
              onChange={handleChange}
            />
            Expense
          </label>
        </div>
        <div id="MonthAddBox">
          <button id="MonthAddButton" onClick={handleSubmit}>ADD</button>
        </div>
      </div>

      {/* Display total */}
      <div id="MonthTransTotal">
        <h3>Total: ₹{MonthTransTotal}</h3>
      </div>

      {/* Render stored transactions */}
      <div id="StoredTransactions">
        <h2>Transactions:</h2>
        <ul>
          {transactionsList.map((trans, index) => (
            <li key={index} className='TransContainer'>
              <strong className="TransName">{trans.TransactionName}</strong> 
              {
                (trans.Type === 'income') ? (
                  <div className='TransIncAmount'>+{trans.Amount}</div>
                ) : (
                  <div className="TransExpAmount">-{trans.Amount}</div>
                )
              }
              {
                (trans.Type === 'income') ? (
                  <div className='TransInc'>Income</div>
                ) : (
                  <div className="TransExp">Expense</div>
                )
              }
              <button className="TransDelete" onClick={() => handleDelete(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>
      

    </div>
  );
}
