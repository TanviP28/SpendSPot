import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Card } from 'react-bootstrap';
import { ExpenseChart, IncomeChart } from './components/Chart'; // Import from Chart.js
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import ThreeDVisualization from './components/ThreeDVisualization'; // Import 3D model component
import { db, auth, signOut } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, loading] = useAuthState(auth);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [currentPage, setCurrentPage] = useState('login'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userId = user.uid;

          // Fetch expenses
          const expensesCollection = collection(db, 'expenses');
          const expenseQuery = query(expensesCollection, where('userId', '==', userId));
          const expenseSnapshot = await getDocs(expenseQuery);
          const expenseList = expenseSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setExpenses(expenseList);

          // Fetch income
          const incomeCollection = collection(db, 'income');
          const incomeQuery = query(incomeCollection, where('userId', '==', userId));
          const incomeSnapshot = await getDocs(incomeQuery);
          const incomeList = incomeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setIncome(incomeList);
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, [user]);

  // Calculate total income and expenses
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  const switchPage = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="auth-container">
        {currentPage === 'login' ? (
          <Login switchPage={switchPage} />
        ) : (
          <Register switchPage={switchPage} />
        )}
      </div>
    );
  }

  return (
    <div className="App">
     <Navbar bg="dark" variant="dark">
  <Navbar.Brand style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif',fontSize:'30px' }}>SpendSpot- A Budget Management Dashboard</Navbar.Brand>
  <Nav className="mr-auto">
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
  <Button
    variant="outline-light"
    onClick={handleSignOut}
    style={{
      backgroundColor: '#FF6347',
      color: 'white',
      padding: '10px 30px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      marginLeft: '10px',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#FF4500')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#FF6347')}
    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
  >
    Sign Out
  </Button>
</div>

  </Nav>
 

</Navbar>

<Container className="mt-4">
  <Row>
    <Col md={6}>
      <Card className="mb-4">
        <Card.Header style={{ fontWeight: 'bold', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
          Expenses
        </Card.Header>
        <Card.Body>
          <Card.Footer
            className="text-muted"
            style={{ fontWeight: 'bold', marginBottom: '10px' }}
          >
            Total Expenses: ${totalExpenses}
          </Card.Footer>
          <ExpenseChart expenses={expenses} />
          <div style={{ marginTop: '20px' }}>
            <ExpenseForm setExpenses={setExpenses} expenses={expenses} />
          </div>
        </Card.Body>
      </Card>
    </Col>

    <Col md={6}>
      <Card className="mb-4">
        <Card.Header style={{ fontWeight: 'bold', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
          Income
        </Card.Header>
        <Card.Body style={{ marginLeft: '10px' }}>
  <Card.Footer
    className="text-muted"
    style={{ fontWeight: 'bold', marginBottom: '10px' }}
  >
    Total Income: ${totalIncome}
  </Card.Footer>
  <IncomeChart income={income} />
  <div style={{ marginTop: '20px' }}>
    <IncomeForm setIncome={setIncome} income={income} />
  </div>
</Card.Body>

      </Card>
    </Col>
  </Row>

  {/* 3D Model Section */}
  <Row className="mt-5">

    <Col md={12} className="text-center">
      <ThreeDVisualization />
    </Col>
  </Row>
</Container>


      {/* Footer */}
      <footer className="bg-light text-center text-lg-start mt-5">
        <div></div>
      </footer>
    </div>
  );
}

export default App;
