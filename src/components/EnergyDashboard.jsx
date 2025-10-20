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
    
    // Get unique day-month combinations
    const uniqueDaySet = new Set(data.map(row => `${row.luna}-${row.zi}`));
    const uniqueDays = uniqueDaySet.size;
    
    // Get unique months
    const uniqueMonthSet = new Set(data.map(row => row.luna));
    const uniqueMonths = uniqueMonthSet.size;
    
    // Calculate date range from actual luna/zi/an values
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.an, a.luna - 1, a.zi, a.ora);
      const dateB = new Date(b.an, b.luna - 1, b.zi, b.ora);
      return dateA - dateB;
    });
    
    const firstRow = sortedData[0];
    const lastRow = sortedData[sortedData.length - 1];
    
    const minDate = new Date(firstRow.an, firstRow.luna - 1, firstRow.zi);
    const maxDate = new Date(lastRow.an, lastRow.luna - 1, lastRow.zi);
    
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
      <div className="dashboard-hero">
        <h2>⚡ <strong>Energy Consumption</strong> Dashboard</h2>
        
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
      </div>
      
      <div className="dashboard-content">
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Consumption</h3>
            <p className="stat-value">{analysis.totalConsumption.toFixed(2)}</p>
            <small>{analysis.dataPoints} data points</small>
          </div>
          
          <div className="stat-card">
            <h3>Average Hourly</h3>
            <p className="stat-value">{analysis.avgConsumption.toFixed(3)}</p>
            <small>kWh per hour</small>
          </div>
          
          <div className="stat-card">
            <h3>Peak Consumption</h3>
            <p className="stat-value">{analysis.maxConsumption.toFixed(3)}</p>
            <small>kWh maximum recorded</small>
          </div>
          
          <div className="stat-card">
            <h3>Daily Average</h3>
            <p className="stat-value">{analysis.avgDailyConsumption.toFixed(2)}</p>
            <small>kWh per day</small>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Hourly Consumption Pattern</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="hour" 
                  interval={1}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="#666"
                />
                <YAxis 
                  label={{ value: 'Consumption (kWh)', angle: -90, position: 'insideLeft' }}
                  stroke="#666"
                />
                <Tooltip formatter={formatTooltip} />
                <Legend />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#667eea" 
                strokeWidth={3}
                dot={{ r: 3, fill: "#667eea" }}
              />
              <Line 
                type="monotone" 
                dataKey="maximum" 
                stroke="#764ba2" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Daily Total Consumption</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis 
                label={{ value: 'Total (kWh)', angle: -90, position: 'insideLeft' }}
                stroke="#666"
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="total" fill="#667eea" radius={[4, 4, 0, 0]} />
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
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="hour" 
                interval={1}
                angle={-45}
                textAnchor="end"
                height={60}
                stroke="#666"
              />
              <YAxis 
                label={{ value: 'Average (kWh)', angle: -90, position: 'insideLeft' }}
                stroke="#666"
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="average" fill="#764ba2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;