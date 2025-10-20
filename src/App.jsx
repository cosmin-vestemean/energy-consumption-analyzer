import React, { useState, useCallback } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import EnergyDashboard from './components/EnergyDashboard';
import ConsumptionAnalysis from './components/ConsumptionAnalysis';
import PVRecommendations from './components/PVRecommendations';

function App() {
  const [energyData, setEnergyData] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);

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
          </div>
        ) : (
          <div className="analysis-section">
            <EnergyDashboard data={energyData} analysis={analysisResults} />
            <ConsumptionAnalysis data={energyData} analysis={analysisResults} />
            <PVRecommendations analysis={analysisResults} />
            
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
