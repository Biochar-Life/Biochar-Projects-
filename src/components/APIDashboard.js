import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './APIDashboard.css';

const APIDashboard = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => setApiData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>API Dashboard</h1>
      <ul>
        {apiData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default APIDashboard;

