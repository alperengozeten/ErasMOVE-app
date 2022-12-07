import React from 'react';
import ExcelReader from './ExcelReader';

const Dashboard = () => {
  console.log('Dashboard Page');

  return (
    <div className="dashboard">
        <ExcelReader /> 
    </div>);
};

export default Dashboard;