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
        
        // Try to extract year from sheet name (e.g., "2025" or "Sheet1 (2025)")
        let dataYear = new Date().getFullYear(); // Default to current year
        const yearMatch = worksheetName.match(/\((\d{4})\)|^(\d{4})$/);
        if (yearMatch) {
          const extractedYear = parseInt(yearMatch[1] || yearMatch[2]);
          if (extractedYear >= 2000 && extractedYear <= 2100) {
            dataYear = extractedYear;
          }
        }
        
        console.log(`Using year ${dataYear} from sheet "${worksheetName}"`);
        
        // Process and validate the data
        const processedData = jsonData.map((row, index) => {
          // Handle different possible column names
          const energie = row['energie (kwh)'] || row['energie'] || row['energy'];
          const ora = row['ora'] || row['hour'];
          const zi = row['zi'] || row['day'];
          const luna = row['luna'] || row['month'];
          const an = row['an'] || row['year'] || row['anul'];
          
          // Parse values
          const energieValue = energie !== undefined && energie !== null ? parseFloat(energie) : null;
          const oraValue = ora !== undefined && ora !== null ? parseInt(ora) : null;
          const ziValue = zi !== undefined && zi !== null ? parseInt(zi) : null;
          const lunaValue = luna !== undefined && luna !== null ? parseInt(luna) : null;
          const anValue = an !== undefined && an !== null ? parseInt(an) : dataYear;
          
          // Skip rows with missing required fields
          if (energieValue === null || oraValue === null || ziValue === null || lunaValue === null) {
            return null;
          }
          
          // Validate ranges
          if (isNaN(energieValue) || energieValue < 0 || 
              oraValue < 0 || oraValue > 23 ||
              ziValue < 1 || ziValue > 31 ||
              lunaValue < 1 || lunaValue > 12 ||
              anValue < 2000 || anValue > 2100) {
            return null;
          }
          
          return {
            id: index,
            energie: energieValue,
            ora: oraValue,
            zi: ziValue,
            luna: lunaValue,
            an: anValue,
            timestamp: new Date(anValue, lunaValue - 1, ziValue, oraValue)
          };
        }).filter(row => row !== null); // Filter out invalid/incomplete rows only
        
        console.log(`Processed ${processedData.length} rows of data`);
        console.log('First 5 rows:', processedData.slice(0, 5));
        console.log('Last 5 rows:', processedData.slice(-5));
        
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
          Expected format: energie (kwh) | ora | zi | luna | an (optional)
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
              <th>an (optional)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.6</td>
              <td>0</td>
              <td>1</td>
              <td>6</td>
              <td>2025</td>
            </tr>
            <tr>
              <td>1.79875</td>
              <td>1</td>
              <td>1</td>
              <td>6</td>
              <td>2025</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
        <p className="format-note">
          <small>💡 Tip: If year column is not present, the year will be extracted from the sheet name (e.g., "2025") or current year will be used.</small>
        </p>
      </div>
    </div>
  );
};

export default FileUpload;