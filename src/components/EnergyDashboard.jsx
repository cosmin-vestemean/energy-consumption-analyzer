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
import { useLanguage } from '../i18n/LanguageContext';

const EnergyDashboard = ({ data, analysis }) => {
  const { t } = useLanguage();
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
    name === 'average' ? t('average') : 
    name === 'maximum' ? t('maximum') : 
    name === 'minimum' ? t('minimum') : 
    name === 'total' ? t('total') : name
  ];

  return (
    <div className="energy-dashboard">
      <h2>📊 {t('dashboardTitle')}</h2>
      
      {dataRange && (
        <div className="data-info-banner">
          <strong>📅 {t('dataCoverage')}:</strong> {dataRange.totalReadings} {t('readings')} 
          ({dataRange.uniqueDays} {t('days')}, {dataRange.uniqueMonths} {t('months')}) 
          - {dataRange.coverage}% {t('fullYear')}
          {dataRange.minDate && dataRange.maxDate && (
            <> | {t('period')}: {dataRange.minDate.toLocaleDateString()} - {dataRange.maxDate.toLocaleDateString()}</>
          )}
        </div>
      )}
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>{t('totalConsumption')}</h3>
          <p className="stat-value">{analysis.totalConsumption.toFixed(2)} kWh</p>
          <small>{analysis.dataPoints} {t('dataPoints')}</small>
        </div>
        
        <div className="stat-card">
          <h3>{t('averageHourly')}</h3>
          <p className="stat-value">{analysis.avgConsumption.toFixed(3)} kWh</p>
          <small>{t('perHour')}</small>
        </div>
        
        <div className="stat-card">
          <h3>{t('peakConsumption')}</h3>
          <p className="stat-value">{analysis.maxConsumption.toFixed(3)} kWh</p>
          <small>{t('maximumRecorded')}</small>
        </div>
        
        <div className="stat-card">
          <h3>{t('dailyAverage')}</h3>
          <p className="stat-value">{analysis.avgDailyConsumption.toFixed(2)} kWh</p>
          <small>{t('perDay')}</small>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>{t('hourlyPattern')}</h3>
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
          <h3>{t('dailyConsumption')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis 
                label={{ value: `${t('total')} (kWh)`, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="total" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>{t('peakHours')}</h3>
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