import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Test.css';

axios.defaults.baseURL = 'http://localhost:9090';

function App() {
  const [testId, setTestId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [testType, setTestType] = useState('');
  const [status, setStatus] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [resultData, setResultData] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [labTests, setLabTests] = useState([]);
  const [labTestResults, setLabTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Order Lab Test
  const handleOrderLabTest = async (event) => {
    event.preventDefault();
    setLoading(true);

    const labTest = {
      testId,
      patientId,
      doctorId,
      testType,
      status,
      orderDate
    };

    try {
      const response = await axios.post('/labtests/order', labTest);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // update status 

  // status 
  const handleUpdateTestStatus = async (event) => {
    event.preventDefault();
  
    // Validate if testId and status are provided
    if (!testId || !status) {
      setError("Please enter Test ID and select Status");
      return;
    }
  
    setLoading(true);  // Start the loading process
  
    try {
      // Send a PUT request with the status as a query parameter
      const response = await axios.put(`/labtests/${testId}/status?status=${status}`);

      
      console.log(response.data);  // Log the response from the backend
  
      // Handle success (you can show a success message or update the UI here)
      
    } catch (error) {
      console.error(error);  // Log any errors
  
      // Handle errors (show an error message to the user)
      setError(error.message || "An error occurred while updating the status.");
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  // Upload Test Result
  const handleUploadTestResult = async (event) => {
    event.preventDefault();
    setLoading(true);

    const labTestResult = {
      testId,
      resultData,
      resultDate
    };

    try {
        const response = await axios.post(`/labtests/${testId}/results`, labTestResult);

      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get Test Results by Test ID
  const handleGetTestResults = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
        const response = await axios.get(`/labtests/patients/${patientId}/myresults`);
      setLabTestResults(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get Test Results for Patient
  const handleGetTestResultsForPatient = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
        const response = await axios.get(`/labtests/patients/${patientId}/myresults`);
      setLabTests(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get All Lab Tests
  const handleGetAllLabTests = async () => {
    setLoading(true);

    try {
      const response = await axios.get('/labtests/all');
      setLabTests(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllLabTests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Lab Test Management</h1>

      {/* Order Lab Test */}
      <form onSubmit={handleOrderLabTest}>
        <input
          type="text"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
          placeholder="Test ID"
        />
      


        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Patient ID"
        />
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          placeholder="Doctor ID"
        />
        <input
          type="text"
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
          placeholder="Test Type"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        />
        <input
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          placeholder="Order Date"
        />
        <button type="submit">Order Lab Test</button>
      </form>

   
      {/* Update Test Status */}
      <form onSubmit={handleUpdateTestStatus}>
        <input
          type="text"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
          placeholder="Test ID"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit">Update Test Status</button>
      </form>

      {/* Upload Test Result */}
      <form onSubmit={handleUploadTestResult}>
        <input
          type="text"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
          placeholder="Test ID"
        />
        <input
          type="text"
          value={resultData}
          onChange={(e) => setResultData(e.target.value)}
          placeholder="Result Data"
        />
        <input
          type="date"
          value={resultDate}
          onChange={(e) => setResultDate(e.target.value)}
          placeholder="Result Date"
        />
        <button type="submit">Upload Test Result</button>
      </form>

      {/* Get Test Results by Test ID */}
      <form onSubmit={handleGetTestResults}>
        <input
          type="text"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
          placeholder="Test ID"
        />
        <button type="submit">Get Test Results</button>
      </form>

      {/* Get Test Results for Patient */}
      <form onSubmit={handleGetTestResultsForPatient}>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Patient ID"
        />
        <button type="submit">Get Test Results for Patient</button>
      </form>

      {/* Display Error Messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
