import React from 'react';

const Dashboard = () => {
  console.log('Dashboard Page');
  // Function will execute on click of button
  const onButtonClick = () => {
      // using Java Script method to get PDF file
      fetch('pre_approval_form.doc').then(response => {
          response.blob().then(blob => {
              // Creating new object of PDF file
              const fileURL = window.URL.createObjectURL(blob);
              // Setting various property values
              let alink = document.createElement('a');
              alink.href = fileURL;
              alink.download = 'pre_approval_form.doc';
              alink.click();
          });
      });
  };
  return (
    <div className="dashboard">
      Dashboard
    <h3>Click on below button to download Pre-Approval Form template for exchange student</h3>
    <button onClick={ onButtonClick }>
        Download Template
    </button>  
    </div>);
};

export default Dashboard;