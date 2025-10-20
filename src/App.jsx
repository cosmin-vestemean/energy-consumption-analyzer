import React, { useState, useCallback } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import EnergyDashboard from './components/EnergyDashboard';
import ConsumptionAnalysis from './components/ConsumptionAnalysis';
import PVRecommendations from './components/PVRecommendations';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguage } from './i18n/LanguageContext';

function App() {
  const { t } = useLanguage();
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
    window.open('/docs/index.html', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="header-text">
            <h1>⚡ {t('appTitle')}</h1>
            <p>{t('appSubtitle')}</p>
          </div>
          <div className="header-actions">
            <LanguageSwitcher />
            <button className="help-button" onClick={openDocumentation}>
              <span className="icon">📚</span>
              <span>{t('helpButton')}</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="App-main">
        {energyData.length === 0 ? (
          <div className="upload-section">
            <FileUpload onDataLoaded={handleDataLoaded} />
            
            <div className="price-config-section">
              <h3>⚙️ {t('priceTitle')}</h3>
              <div className="price-input-container">
                <label htmlFor="electricity-price">
                  {t('priceLabel')}:
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
                <p><strong>{t('priceInfoTitle')}</strong></p>
                <p>{t('priceInfoDesc')}</p>
                <ul>
                  <li>{t('priceInfo1')}</li>
                  <li>{t('priceInfo2')}</li>
                  <li>{t('priceInfo3')}</li>
                  <li>{t('priceInfo4')}</li>
                </ul>
                <small>{t('priceInfoNote')}</small>
              </div>
            </div>
          </div>
        ) : (
          <div className="analysis-section">
            <div className="price-display-header">
              <span>{t('priceDisplay')}: <strong>{electricityPrice.toFixed(2)} RON/kWh</strong></span>
              <button 
                className="change-price-btn"
                onClick={() => {
                  const newPrice = prompt(
                    t('priceLabel'),
                    electricityPrice
                  );
                  if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
                    setElectricityPrice(parseFloat(newPrice));
                  }
                }}
              >
                {t('changePrice')}
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
                {t('resetButton')}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
