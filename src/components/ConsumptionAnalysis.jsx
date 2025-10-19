import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';
import './ConsumptionAnalysis.css';

const ConsumptionAnalysis = ({ data, analysis }) => {
  if (!data || !analysis) return null;

  // Calculate trends and patterns
  const trends = useMemo(() => {
    // Peak vs Off-peak analysis
    const peakHours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; // Typical peak hours
    const offPeakHours = [0, 1, 2, 3, 4, 5, 6, 22, 23]; // Off-peak hours
    
    const peakData = data.filter(row => peakHours.includes(row.ora));
    const offPeakData = data.filter(row => offPeakHours.includes(row.ora));
    
    const peakAvg = peakData.reduce((sum, row) => sum + row.energie, 0) / peakData.length;
    const offPeakAvg = offPeakData.reduce((sum, row) => sum + row.energie, 0) / offPeakData.length;
    
    // Load factor calculation
    const loadFactor = (analysis.avgConsumption / analysis.maxConsumption) * 100;
    
    // Consumption variability
    const energyValues = data.map(row => row.energie);
    const variance = energyValues.reduce((sum, val) => sum + Math.pow(val - analysis.avgConsumption, 2), 0) / energyValues.length;
    const stdDeviation = Math.sqrt(variance);
    const coefficientOfVariation = (stdDeviation / analysis.avgConsumption) * 100;
    
    return {
      peakAvg,
      offPeakAvg,
      peakToOffPeakRatio: peakAvg / offPeakAvg,
      loadFactor,
      coefficientOfVariation,
      stdDeviation
    };
  }, [data, analysis]);

  // Time series data for trend analysis
  const timeSeriesData = useMemo(() => {
    return data.map((row, index) => ({
      index,
      consumption: row.energie,
      hour: row.ora,
      day: row.zi,
      month: row.luna,
      timestamp: row.timestamp?.getTime() || index
    })).slice(0, 200); // Limit for performance
  }, [data]);

  // Consumption ranges for distribution analysis
  const distributionData = useMemo(() => {
    const ranges = [
      { range: '0-1 kWh', min: 0, max: 1 },
      { range: '1-5 kWh', min: 1, max: 5 },
      { range: '5-10 kWh', min: 5, max: 10 },
      { range: '10-20 kWh', min: 10, max: 20 },
      { range: '20-30 kWh', min: 20, max: 30 },
      { range: '30+ kWh', min: 30, max: Infinity }
    ];
    
    return ranges.map(range => {
      const count = data.filter(row => 
        row.energie >= range.min && row.energie < range.max
      ).length;
      
      return {
        range: range.range,
        count,
        percentage: ((count / data.length) * 100).toFixed(1)
      };
    });
  }, [data]);

  return (
    <div className="consumption-analysis">
      <h2>🔍 Detailed Consumption Analysis</h2>
      
      <div className="analysis-grid">
        <div className="analysis-card">
          <h3>Peak vs Off-Peak Analysis</h3>
          <div className="metrics-row">
            <div className="metric">
              <span className="metric-label">Peak Hours Avg:</span>
              <span className="metric-value">{trends.peakAvg.toFixed(3)} kWh</span>
            </div>
            <div className="metric">
              <span className="metric-label">Off-Peak Avg:</span>
              <span className="metric-value">{trends.offPeakAvg.toFixed(3)} kWh</span>
            </div>
            <div className="metric">
              <span className="metric-label">Peak/Off-Peak Ratio:</span>
              <span className="metric-value">{trends.peakToOffPeakRatio.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <h3>Load Characteristics</h3>
          <div className="metrics-row">
            <div className="metric">
              <span className="metric-label">Load Factor:</span>
              <span className="metric-value">{trends.loadFactor.toFixed(1)}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Variability (CV):</span>
              <span className="metric-value">{trends.coefficientOfVariation.toFixed(1)}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Std Deviation:</span>
              <span className="metric-value">{trends.stdDeviation.toFixed(3)} kWh</span>
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <h3>Peak Hours Identification</h3>
          <div className="peak-hours-list">
            {analysis.peakHours.map((peak, index) => (
              <div key={index} className="peak-hour-item">
                <span className="hour">{peak.hour}:00</span>
                <span className="consumption">{peak.avgConsumption.toFixed(3)} kWh</span>
                <div className="peak-bar" style={{width: `${(peak.avgConsumption / analysis.maxConsumption) * 100}%`}}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-card">
          <h3>Consumption Distribution</h3>
          <div className="distribution-chart">
            {distributionData.map((item, index) => (
              <div key={index} className="distribution-item">
                <span className="range-label">{item.range}</span>
                <div className="distribution-bar-container">
                  <div 
                    className="distribution-bar" 
                    style={{width: `${item.percentage}%`}}
                  ></div>
                  <span className="percentage">{item.percentage}%</span>
                </div>
                <span className="count">({item.count} readings)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Consumption Time Series</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="index"
                label={{ value: 'Time Index', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Consumption (kWh)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [`${parseFloat(value).toFixed(3)} kWh`, 'Consumption']}
                labelFormatter={(label) => `Reading #${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="#007acc" 
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Consumption vs Hour Scatter Plot</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={data.slice(0, 500)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                dataKey="ora" 
                domain={[0, 23]}
                label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                type="number"
                dataKey="energie"
                label={{ value: 'Consumption (kWh)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'energie' ? `${parseFloat(value).toFixed(3)} kWh` : value,
                  name === 'energie' ? 'Consumption' : 'Hour'
                ]}
              />
              <Scatter dataKey="energie" fill="#00C49F" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="insights-section">
        <h3>📋 Key Insights</h3>
        <div className="insights-grid">
          <div className="insight-item">
            <strong>Load Pattern:</strong>
            <p>
              {trends.loadFactor > 70 ? 
                "High load factor indicates consistent energy usage throughout the day." :
                trends.loadFactor > 40 ?
                "Moderate load factor with some peak usage periods." :
                "Low load factor suggests high variability and peak usage patterns."
              }
            </p>
          </div>
          
          <div className="insight-item">
            <strong>Peak Demand:</strong>
            <p>
              Peak consumption of {analysis.maxConsumption.toFixed(2)} kWh occurs during 
              {analysis.peakHours.length > 0 ? ` hour ${analysis.peakHours[0].hour}:00` : ' daytime hours'}.
              This represents the minimum system capacity needed.
            </p>
          </div>
          
          <div className="insight-item">
            <strong>Variability:</strong>
            <p>
              {trends.coefficientOfVariation > 100 ?
                "Very high consumption variability requires robust system design." :
                trends.coefficientOfVariation > 50 ?
                "Moderate variability allows for optimized system sizing." :
                "Low variability enables efficient system design with minimal oversizing."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionAnalysis;