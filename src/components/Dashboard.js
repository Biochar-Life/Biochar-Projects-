import React from 'react';
import './Dashboard.css'; // Ensure this file exists

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="search-fields">
        <label>
          Certificate:
          <input type="text" placeholder="All Certificates which are in creating status" />
        </label>
        <label>
          Status:
          <input type="text" placeholder="Status of Certificate" />
        </label>
        <label>
          Region:
          <input type="text" placeholder="Region" />
        </label>
        <label>
          Production Type:
          <input type="text" placeholder="This is Type of Production: General or Artisan Pro" />
        </label>
      </div>
      <div className="display-elements">
        <div className="display-item">
          <h3>Biochar Produced</h3>
          <p>Total Biochar Produced based on the search field selected</p>
        </div>
        <div className="display-item">
          <h3>Biochar Used</h3>
          <p>Total Biochar Used based on the search field selected</p>
        </div>
        <div className="display-item">
          <h3>Gross Sink</h3>
          <p>Total Gross Carbon Sink based on the search field selected</p>
        </div>
        <div className="display-item">
          <h3>Net Sink</h3>
          <p>Total Net Carbon Sink based on the search field selected (Gross Sink - Security Margin)</p>
        </div>
      </div>
      <div className="region-summary">
        <h3>Region Summary</h3>
        <p>Received: Count of Received submissions (Status=Received in BiochaActivities Table)</p>
        <p>Approved: Count of Approved submissions (Status=Approved in BiochaActivities Table)</p>
        <p>Under Review: Count of Under Review submissions (Status=Under Review in BiochaActivities Table)</p>
        <p>Certified: Count of Certified submissions (Status=Certified in BiochaActivities Table)</p>
        <p>Biochar Produced: Based on Region</p>
        <p>% Completion: Calculates how much we have completed so far based on Target in Certificate Table</p>
      </div>
    </div>
  );
}

export default Dashboard;
