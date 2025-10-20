import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './EnergyDashboard.css';

const EnergyDashboard = ({ data, analysis }) => {
  if (!data || !analysis) return null;

  // Calculate data range information
  const dataRange = React.useMemo(() => {
    if (data.length === 0) return null;
    
    const dates = data.map(row => row.timestamp).filter(d => d);
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    
    const uniqueDays = new Set(data.map(row => `${row.luna}-${row.zi}`)).size;
    const uniqueMonths = new Set(data.map(row => row.luna)).size;
    
    return {
      minDate,
      maxDate,
      uniqueDays,
      uniqueMonths,
      totalReadings: data.length,
      expectedYearlyReadings: 365 * 24, // 8760 hours in a year
      coverage: ((data.length / (365 * 24)) * 100).toFixed(1)
    };
  }, [data]);

  // Prepare hourly consumption data
  const hourlyData = Object.entries(analysis.hourlyStats).map(([hour, stats]) => ({
    hour: `${hour}:00`,
    hourNum: parseInt(hour),
    average: parseFloat(stats.avg.toFixed(3)),
    maximum: parseFloat(stats.max.toFixed(3)),
    minimum: parseFloat(stats.min.toFixed(3))
  })).sort((a, b) => a.hourNum - b.hourNum);

  // Prepare daily consumption data
  const dailyData = Object.entries(analysis.dailyStats).map(([dayKey, total]) => {
    const [day, month] = dayKey.split('-').map(Number);
    return {
      day: `${day}/${month}`,
      dayNum: day,
      monthNum: month,
      total: parseFloat(total.toFixed(3))
    };
  }).sort((a, b) => {
    if (a.monthNum === b.monthNum) {
      return a.dayNum - b.dayNum;
    }
    return a.monthNum - b.monthNum;
  });

  // Peak hours data for pie chart
  const peakHoursData = analysis.peakHours.map(item => ({
    name: `${item.hour}:00`,
    value: parseFloat(item.avgConsumption.toFixed(3)),
    hour: item.hour
  }));

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Custom tooltip formatters
  const formatTooltip = (value, name) => [
    `${parseFloat(value).toFixed(3)} kWh`,
    name === 'average' ? 'Average' : 
    name === 'maximum' ? 'Maximum' : 
    name === 'minimum' ? 'Minimum' : 
    name === 'total' ? 'Total' : name
  ];

  return (
    <div className="energy-dashboard">
      <h2>📊 Energy Consumption Dashboard</h2>
      
      {dataRange && (
        <div className="data-info-banner">
          <strong>📅 Data Coverage:</strong> {dataRange.totalReadings} readings 
          ({dataRange.uniqueDays} days, {dataRange.uniqueMonths} months) 
          - {dataRange.coverage}% of full year
          {dataRange.minDate && dataRange.maxDate && (
            <> | Period: {dataRange.minDate.toLocaleDateString()} - {dataRange.maxDate.toLocaleDateString()}</>
          )}
        </div>
      )}
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Consumption</h3>
          <p className="stat-value">{analysis.totalConsumption.toFixed(2)} kWh</p>
          <small>{analysis.dataPoints} data points</small>
        </div>
        
        <div className="stat-card">
          <h3>Average Hourly</h3>
          <p className="stat-value">{analysis.avgConsumption.toFixed(3)} kWh</p>
          <small>Per hour</small>
        </div>
        
        <div className="stat-card">
          <h3>Peak Consumption</h3>
          <p className="stat-value">{analysis.maxConsumption.toFixed(3)} kWh</p>
          <small>Maximum recorded</small>
        </div>
        
        <div className="stat-card">
          <h3>Daily Average</h3>
          <p className="stat-value">{analysis.avgDailyConsumption.toFixed(2)} kWh</p>
          <small>Per day</small>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Hourly Consumption Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                interval={1}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                label={{ value: 'Consumption (kWh)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={formatTooltip} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#0088FE" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="maximum" 
                stroke="#FF8042" 
                strokeWidth={1}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Daily Total Consumption</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis 
                label={{ value: 'Total (kWh)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="total" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Peak Consumption Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={peakHoursData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value} kWh`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {peakHoursData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} kWh`, 'Average Consumption']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Consumption Distribution (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                interval={1}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                label={{ value: 'Average (kWh)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="average" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;