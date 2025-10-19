import React, { useCallback } from 'react';
import * as XLSX from 'xlsx';
import './FileUpload.css';

const FileUpload = ({ onDataLoaded }) => {
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Process and validate the data
        const processedData = jsonData.map((row, index) => {
          // Handle different possible column names
          const energie = row['energie (kwh)'] || row['energie'] || row['energy'] || 0;
          const ora = row['ora'] || row['hour'] || 0;
          const zi = row['zi'] || row['day'] || 1;
          const luna = row['luna'] || row['month'] || 1;
          
          return {
            id: index,
            energie: parseFloat(energie) || 0,
            ora: parseInt(ora) || 0,
            zi: parseInt(zi) || 1,
            luna: parseInt(luna) || 1,
            timestamp: new Date(2024, (parseInt(luna) || 1) - 1, parseInt(zi) || 1, parseInt(ora) || 0)
          };
        }).filter(row => row.energie > 0); // Filter out invalid data
        
        console.log('Processed data:', processedData.slice(0, 5)); // Log first 5 rows for debugging
        
        if (processedData.length === 0) {
          alert('No valid data found in the file. Please check the format.');
          return;
        }
        
        onDataLoaded(processedData);
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Error reading file. Please make sure it\'s a valid Excel file with the correct format.');
      }
    };
    
    reader.readAsArrayBuffer(file);
  }, [onDataLoaded]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const event = { target: { files } };
      handleFileUpload(event);
    }
  }, [handleFileUpload]);

  return (
    <div className="file-upload-container">
      <div 
        className="file-upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="upload-icon">📄</div>
        <h3>Upload Excel File</h3>
        <p>Drop your Excel file here or click to browse</p>
        <p className="file-info">
          Expected format: energie (kwh) | ora | zi | luna
        </p>
        
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          className="file-input"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="file-label">
          Choose File
        </label>
      </div>
      
      <div className="sample-data-info">
        <h4>Expected Data Format:</h4>
        <table className="sample-table">
          <thead>
            <tr>
              <th>energie (kwh)</th>
              <th>ora</th>
              <th>zi</th>
              <th>luna</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.6</td>
              <td>0</td>
              <td>1</td>
              <td>6</td>
            </tr>
            <tr>
              <td>1.79875</td>
              <td>1</td>
              <td>1</td>
              <td>6</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileUpload;