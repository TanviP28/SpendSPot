// src/components/Chart.js

import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components required for the charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function ExpenseChart({ expenses }) {
  const expenseLabels = expenses.length > 0 ? expenses.map(exp => exp.category) : ['No Data'];
  const expenseData = expenses.length > 0 ? expenses.map(exp => exp.amount) : [1];

  const data = {
    labels: expenseLabels,
    datasets: [{
      label: 'Expenses',
      data: expenseData,
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#e7e9ed'],
      borderColor: '#ffffff',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: $${context.raw}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export function IncomeChart({ income }) {
  const incomeLabels = income.length > 0 ? income.map(inc => inc.source) : ['No Data'];
  const incomeData = income.length > 0 ? income.map(inc => inc.amount) : [1];

  const data = {
    labels: incomeLabels,
    datasets: [{
      label: 'Income',
      data: incomeData,
      backgroundColor: ['#4bc0c0', '#ff6384', '#36a2eb', '#cc65fe'],
      borderColor: '#ffffff',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: $${context.raw}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
}
