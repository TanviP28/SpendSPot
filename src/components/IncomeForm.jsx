// src/components/IncomeForm.jsx

import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

function IncomeForm({ setIncome, income }) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (source && amount) {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const newIncome = { source, amount: Number(amount), date: new Date().toISOString(), userId };
        await addDoc(collection(db, 'income'), newIncome);
        setIncome(prevIncome => [...prevIncome, newIncome]);
        setSource('');
        setAmount('');
      } catch (error) {
        console.error('Error adding income:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'income', id));
      setIncome(prevIncome => prevIncome.filter(inc => inc.id !== id));
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formSource">
          <Form.Label>Source</Form.Label>
          <Form.Control 
            type="text" 
            value={source} 
            onChange={(e) => setSource(e.target.value)} 
            required 
            placeholder="Enter source"
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
          Add Income
        </Button>
      </Form>

      {deleteMode && (
        <div>
          <h5>Click on an income to delete it</h5>
          <ListGroup>
            {income.map(inc => (
              <ListGroup.Item
                key={inc.id}
                onClick={() => handleDelete(inc.id)}
                style={{ cursor: 'pointer' }}
              >
                {inc.source}: ${inc.amount}
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

export default IncomeForm;
