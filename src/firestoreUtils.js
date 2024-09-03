// src/firestoreUtils.js

import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Function to add an expense
export async function addExpense(expense) {
  try {
    const docRef = await addDoc(collection(db, "expenses"), expense);
    console.log("Expense added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding expense: ", e);
  }
}

// Function to retrieve expenses
export async function getExpenses() {
  const expensesCollection = collection(db, "expenses");
  const expenseSnapshot = await getDocs(expensesCollection);
  const expenseList = expenseSnapshot.docs.map(doc => doc.data());
  return expenseList;
}
