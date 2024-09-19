import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // Make sure you have installed moment

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/certificates')  // No '/api' in the path
      .then(response => {
        console.log('Data received:', response.data);  // Log data to check format
        setCertificates(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);  // Log errors
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="certificates-page">
      <h2>Certificates</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date Issued</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {certificates.length > 0 ? (
            certificates.map(cert => {
              console.log('Certificate data:', cert);  // Log each certificate data
              return (
                <tr key={cert.id}>
                  <td>{cert.id}</td>
                  <td>{cert.certificate_code || 'N/A'}</td>  {/* Display certificate code instead of name */}
                  <td>{cert.issue_date ? new Date(cert.issue_date).toLocaleDateString() : 'N/A'}</td>  {/* Display issue date */}
                  <td>{cert.status || 'N/A'}</td>  {/* Display status */}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No certificates available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Certificates;
