// src/components/ExpenseForm.jsx

import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

function ExpenseForm({ setExpenses, expenses }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && amount) {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const newExpense = { category, amount: Number(amount), date: new Date().toISOString(), userId };
        await addDoc(collection(db, 'expenses'), newExpense);
        setExpenses(prevExpenses => [...prevExpenses, newExpense]);
        setCategory('');
        setAmount('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            placeholder="Enter category"
          />
        </Form.Group>
        <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
            placeholder="Enter amount"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add Expense
        </Button>
      </Form>

      {deleteMode && (
        <div>
          <h5>Click on an expense to delete it</h5>
          <ListGroup>
            {expenses.map(expense => (
              <ListGroup.Item
                key={expense.id}
                onClick={() => handleDelete(expense.id)}
                style={{ cursor: 'pointer' }}
              >
                {expense.category}: ${expense.amount}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
      <Button variant="danger" className="mt-3" onClick={() => setDeleteMode(prev => !prev)}>
        {deleteMode ? 'Cancel Delete' : 'Enable Delete'}
      </Button>
    </div>
  );
}

export default ExpenseForm;
