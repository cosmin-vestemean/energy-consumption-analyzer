import React, { useState, useCallback } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import EnergyDashboard from './components/EnergyDashboard';
import ConsumptionAnalysis from './components/ConsumptionAnalysis';
import PVRecommendations from './components/PVRecommendations';

function App() {
  const [energyData, setEnergyData] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  // Electricity price in RON/kWh - default to typical Romanian household rate
  const [electricityPrice, setElectricityPrice] = useState(0.80);

  const handleDataLoaded = useCallback((data) => {
    setEnergyData(data);
    
    // Perform initial analysis
    const analysis = analyzeEnergyData(data);
    setAnalysisResults(analysis);
  }, []);

  const analyzeEnergyData = (data) => {
    if (!data || data.length === 0) return null;

    const energyValues = data.map(row => row.energie);
    
    // Basic statistics
    const maxConsumption = Math.max(...energyValues);
    const minConsumption = Math.min(...energyValues);
    const avgConsumption = energyValues.reduce((sum, val) => sum + val, 0) / energyValues.length;
    const totalConsumption = energyValues.reduce((sum, val) => sum + val, 0);

    // Hourly analysis
    const hourlyStats = {};
    for (let hour = 0; hour < 24; hour++) {
      const hourData = data.filter(row => row.ora === hour);
      if (hourData.length > 0) {
        const hourValues = hourData.map(row => row.energie);
        hourlyStats[hour] = {
          avg: hourValues.reduce((sum, val) => sum + val, 0) / hourValues.length,
          max: Math.max(...hourValues),
          min: Math.min(...hourValues),
          count: hourValues.length
        };
      }
    }

    // Daily analysis
    const dailyStats = {};
    const dailyTotals = {};
    
    data.forEach(row => {
      const dayKey = `${row.zi}-${row.luna}`;
      if (!dailyTotals[dayKey]) {
        dailyTotals[dayKey] = 0;
      }
      dailyTotals[dayKey] += row.energie;
    });

    const dailyConsumptions = Object.values(dailyTotals);
    const avgDailyConsumption = dailyConsumptions.reduce((sum, val) => sum + val, 0) / dailyConsumptions.length;
    const maxDailyConsumption = Math.max(...dailyConsumptions);
    const minDailyConsumption = Math.min(...dailyConsumptions);

    // Peak consumption hours
    const peakHours = Object.entries(hourlyStats)
      .sort(([,a], [,b]) => b.avg - a.avg)
      .slice(0, 5)
      .map(([hour, stats]) => ({ hour: parseInt(hour), avgConsumption: stats.avg }));

    return {
      maxConsumption,
      minConsumption,
      avgConsumption,
      totalConsumption,
      hourlyStats,
      dailyStats: dailyTotals,
      avgDailyConsumption,
      maxDailyConsumption,
      minDailyConsumption,
      peakHours,
      dataPoints: data.length
    };
  };

  const openDocumentation = () => {
    window.open('/docs/index.html', '_blank', 'width=1200,height=800');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚡ Electric Consumption Analyzer</h1>
        <p>Analyze energy consumption data to design optimal photovoltaic systems</p>
        <button className="help-button" onClick={openDocumentation}>
          <span className="icon">📚</span>
          <span>Documentation</span>
        </button>
      </header>
      
      <main className="App-main">
        {energyData.length === 0 ? (
          <div className="upload-section">
            <FileUpload onDataLoaded={handleDataLoaded} />
            
            <div className="price-config-section">
              <h3>⚙️ Configurare Preț Energie</h3>
              <div className="price-input-container">
                <label htmlFor="electricity-price">
                  Preț energie electrică (RON/kWh):
                </label>
                <input
                  id="electricity-price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="5.00"
                  value={electricityPrice}
                  onChange={(e) => setElectricityPrice(parseFloat(e.target.value) || 0.80)}
                />
                <span className="price-display">{electricityPrice.toFixed(2)} RON/kWh</span>
              </div>
              <div className="price-info">
                <p><strong>Prețuri de referință (2025):</strong></p>
                <ul>
                  <li>0.68 RON/kWh - consum &lt; 100 kWh/lună (plafonat)</li>
                  <li>0.80 RON/kWh - consum 100-255 kWh/lună (plafonat, implicit)</li>
                  <li>1.30 RON/kWh - consum &gt; 300 kWh/lună</li>
                  <li>0.773 RON/kWh - PPC Simplu Online</li>
                  <li>1.036 RON/kWh - Hidroelectrica</li>
                </ul>
                <small>Conform OUG 6/2025 și oferte piață liberă (august 2025)</small>
              </div>
            </div>
          </div>
        ) : (
          <div className="analysis-section">
            <div className="price-display-header">
              <span>Preț energie: <strong>{electricityPrice.toFixed(2)} RON/kWh</strong></span>
              <button 
                className="change-price-btn"
                onClick={() => {
                  const newPrice = prompt(
                    `Introduceți noul preț al energiei (RON/kWh):\n\nPrețuri de referință:\n• 0.68 RON/kWh - consum < 100 kWh/lună\n• 0.80 RON/kWh - consum 100-255 kWh/lună (implicit)\n• 1.30 RON/kWh - consum > 300 kWh/lună`,
                    electricityPrice
                  );
                  if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
                    setElectricityPrice(parseFloat(newPrice));
                  }
                }}
              >
                Modifică Preț
              </button>
            </div>
            <EnergyDashboard data={energyData} analysis={analysisResults} />
            <ConsumptionAnalysis data={energyData} analysis={analysisResults} />
            <PVRecommendations analysis={analysisResults} electricityPrice={electricityPrice} />
            
            <div className="reset-section">
              <button 
                className="reset-btn"
                onClick={() => {
                  setEnergyData([]);
                  setAnalysisResults(null);
                }}
              >
                Load New File
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
