import React, { useState, useEffect } from 'react';
import './YearlyBudget.css'; // Import CSS specific to YearlyBudget

export default function YearlyBudget() {
  const [yearlyTransaction, setYearlyTransaction] = useState({
    YearlyTransactionName: '', // Specifies transaction name field
    YearlyAmount: '',
    Type: 'income'
  });

  const [yearlyTransactionsList, setYearlyTransactionsList] = useState([]);
  const [YearTransTotal, setYearTransTotal] = useState(0); // State for total transaction amount

  useEffect(()=>{
    localStorage.setItem("YearTotal",YearTransTotal)
  },[YearTransTotal])
  useEffect(() => {
    // Load transactions from local storage on component mount
    const storedYearlyTransactions = JSON.parse(localStorage.getItem('yearlyTransactions')) || [];
    if (storedYearlyTransactions.length > 0) {
      setYearlyTransactionsList(storedYearlyTransactions); // Set stored transactions to state
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever yearlyTransactionsList changes
    localStorage.setItem('yearlyTransactions', JSON.stringify(yearlyTransactionsList)); // Store transactions in local storage

    // Recalculate total whenever yearlyTransactionsList changes
    calculateTotal(yearlyTransactionsList); // Calculate total transaction amount
  }, [yearlyTransactionsList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYearlyTransaction({ ...yearlyTransaction, [name]: value }); // Update transaction details
  };

  const handleSubmit = () => {
    // Add current transaction to the list
    const newYearlyTransaction = { ...yearlyTransaction };
    setYearlyTransactionsList([...yearlyTransactionsList, newYearlyTransaction]); // Add new transaction to the list
    
    // Reset form after submission
    setYearlyTransaction({ YearlyTransactionName: '', YearlyAmount: '', Type: 'income' }); // Reset transaction form fields
  };

  const handleDelete = (index) => {
    // Create a copy of the yearly transactions list
    const updatedYearlyTransactions = [...yearlyTransactionsList];
    // Remove the transaction at the specified index
    updatedYearlyTransactions.splice(index, 1);
    // Update state with the updated list
    setYearlyTransactionsList(updatedYearlyTransactions); // Update transaction list after deletion
  };

  const calculateTotal = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((trans) => {
      if (trans.Type === 'income') {
        totalIncome += parseFloat(trans.YearlyAmount); // Calculate total income
      } else if (trans.Type === 'expense') {
        totalExpense += parseFloat(trans.YearlyAmount); // Calculate total expense
      }
    });

    const yearTotal = totalIncome - totalExpense;
    setYearTransTotal(yearTotal); // Set total transaction amount
  };

  return (
    <div id="YearlyBudgetComponent"> {/* Main component section */}
      <div id="YearlyBudgetInputs">
        <h5 id="YearTransNLabel">Transaction Name:</h5>
        <input
          id="YearTransName"
          name="YearlyTransactionName" // Specifies transaction name input field
          type='text'
          placeholder='Enter Transaction Name'
          value={yearlyTransaction.YearlyTransactionName} // Bind transaction name value
          onChange={handleChange}
          required
          maxLength={18}
        />
        <h5 id="YearTransALabel">Amount:</h5>
        <input
          id="YearTransAmount"
          name="YearlyAmount" // Specifies transaction amount input field
          type='number'
          placeholder='Enter Amount in ₹INR'
          value={yearlyTransaction.YearlyAmount} // Bind transaction amount value
          onChange={handleChange}
          required
          maxLength={15}
        />
        <div id="YearRadioButtons">
          <label>
            <input
              type='radio'
              name='Type'
              value='income'
              checked={yearlyTransaction.Type === 'income'} // Specifies income type radio button
              onChange={handleChange}
            />
            Income
          </label>
          <label>
            <input
              type='radio'
              name='Type'
              value='expense'
              checked={yearlyTransaction.Type === 'expense'} // Specifies expense type radio button
              onChange={handleChange}
            />
            Expense
          </label>
        </div>
        <div id="YearAddBox">
          <button id="YearAddButton" onClick={handleSubmit}>ADD</button> {/* Specifies add button */}
        </div>
      </div>

      {/* Display total */}
      <div id="YearTransTotal">
        <h3>Total: ₹{YearTransTotal}</h3> {/* Specifies total transaction amount */}
      </div>

      {/* Render stored transactions */}
      <div id="StoredYearlyTransactions">
        <h2>Transactions:</h2>
        <ul>
          {yearlyTransactionsList.map((trans, index) => (
            <li key={index} className='YearTransContainer'>
              <strong className="YearTransName">{trans.YearlyTransactionName}</strong> {/* Specifies transaction name */}
              {
                (trans.Type === 'income') ? (
                  <div className='YearTransIncAmount'>+{trans.YearlyAmount}</div> 
                ) : (
                  <div className="YearTransExpAmount">-{trans.YearlyAmount}</div> 
                )
              }
              {
                (trans.Type === 'income') ? (
                  <div className='YearTransInc'>Income</div> // Specifies income label
                ) : (
                  <div className="YearTransExp">Expense</div> // Specifies expense label
                )
              }
              <button className="YearTransDelete" onClick={() => handleDelete(index)}>X</button> {/* Specifies delete button */}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
