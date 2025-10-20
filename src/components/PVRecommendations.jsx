import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { defaultPVConfig } from '../config/pvSystemConfig';
import PVConfigPanel from './PVConfigPanel';
import './PVRecommendations.css';

const PVRecommendations = ({ analysis, electricityPrice }) => {
  if (!analysis) return null;

  // State for configuration
  const [config, setConfig] = useState(defaultPVConfig);

  // PV System Calculations
  const pvCalculations = useMemo(() => {
    // Use configuration values
    const systemEfficiency = config.solar.panelEfficiency;
    const panelWattage = config.solar.panelWattage;
    const peakSunHours = config.solar.peakSunHours;
    const autonomyDays = config.battery.autonomyDays;
    const batteryEfficiency = config.battery.batteryEfficiency;
    const batteryCycleLife = config.battery.batteryCycleLife;
    
    // Daily energy requirement (kWh)
    const dailyEnergyKwh = analysis.avgDailyConsumption;
    
    // Peak power requirement (kW)
    const peakPowerKw = analysis.maxConsumption;
    
    // PV Array Sizing
    const pvArraySizeKw = (dailyEnergyKwh / peakSunHours) / systemEfficiency;
    const numberOfPanels = Math.ceil((pvArraySizeKw * 1000) / panelWattage);
    
    // Battery Sizing
    const batteryCapacityKwh = (dailyEnergyKwh * autonomyDays) / batteryEfficiency;
    
    // Inverter Sizing (configurable safety margin)
    const inverterSizeKw = peakPowerKw * config.inverter.safetyMargin;
    
    // Cost Estimations (using configuration values)
    const panelCostPerWatt = config.solar.panelCostPerWatt; // RON per Watt
    const batteryCostPerKwh = config.battery.batteryCostPerKwh; // RON per kWh
    const inverterCostPerKw = config.inverter.inverterCostPerKw; // RON per kW
    const installationCostMultiplier = config.installation.installationMultiplier;
    
    const panelCost = numberOfPanels * panelWattage * panelCostPerWatt;
    const batteryCost = batteryCapacityKwh * batteryCostPerKwh;
    const inverterCost = inverterSizeKw * inverterCostPerKw;
    const equipmentCost = panelCost + batteryCost + inverterCost;
    const totalSystemCost = equipmentCost * installationCostMultiplier;
    
    // Energy Production Estimation
    const annualEnergyProduction = pvArraySizeKw * peakSunHours * 365;
    const energyOffsetPercentage = Math.min((annualEnergyProduction / (dailyEnergyKwh * 365)) * 100, 100);
    
    // Payback calculations using the configurable or passed electricity price (RON/kWh)
    const electricityCostPerKwh = electricityPrice || config.financial.electricityPricePerKwh;
    const annualSavings = dailyEnergyKwh * 365 * electricityCostPerKwh * (energyOffsetPercentage / 100);
    const paybackYears = totalSystemCost / annualSavings;
    
    return {
      dailyEnergyKwh,
      peakPowerKw,
      pvArraySizeKw,
      numberOfPanels,
      batteryCapacityKwh,
      inverterSizeKw,
      totalSystemCost,
      annualEnergyProduction,
      energyOffsetPercentage,
      paybackYears,
      annualSavings,
      electricityCostPerKwh,
      costs: {
        panels: panelCost,
        battery: batteryCost,
        inverter: inverterCost,
        installation: equipmentCost * (installationCostMultiplier - 1)
      },
      // Add config metadata
      configUsed: {
        panelWattage,
        peakSunHours,
        productionRatio: config.solar.productionRatio,
        panelAreaM2: config.solar.panelAreaM2,
      }
    };
  }, [analysis, electricityPrice, config]);

  // System sizing options (Conservative, Optimal, Aggressive)
  const systemOptions = useMemo(() => {
    const base = pvCalculations;
    const options = config.systemOptions;
    
    return [
      {
        name: 'Conservative',
        multiplier: options.conservative.pvMultiplier,
        description: 'Covers 80% of energy needs, lower cost, grid backup needed',
        pvSize: base.pvArraySizeKw * options.conservative.pvMultiplier,
        panels: Math.ceil(base.numberOfPanels * options.conservative.pvMultiplier),
        battery: base.batteryCapacityKwh * options.conservative.batteryMultiplier,
        cost: base.totalSystemCost * options.conservative.costMultiplier,
        offset: base.energyOffsetPercentage * options.conservative.offsetMultiplier
      },
      {
        name: 'Optimal',
        multiplier: options.optimal.pvMultiplier,
        description: 'Covers 100% of average needs, balanced approach',
        pvSize: base.pvArraySizeKw,
        panels: base.numberOfPanels,
        battery: base.batteryCapacityKwh,
        cost: base.totalSystemCost,
        offset: base.energyOffsetPercentage
      },
      {
        name: 'Aggressive',
        multiplier: options.aggressive.pvMultiplier,
        description: 'Oversized for future expansion and peak demands',
        pvSize: base.pvArraySizeKw * options.aggressive.pvMultiplier,
        panels: Math.ceil(base.numberOfPanels * options.aggressive.pvMultiplier),
        battery: base.batteryCapacityKwh * options.aggressive.batteryMultiplier,
        cost: base.totalSystemCost * options.aggressive.costMultiplier,
        offset: Math.min(base.energyOffsetPercentage * options.aggressive.offsetMultiplier, 100)
      }
    ];
  }, [pvCalculations, config]);

  // Cost breakdown data for chart
  const costBreakdownData = [
    { component: 'Solar Panels', cost: pvCalculations.costs.panels, percentage: (pvCalculations.costs.panels / pvCalculations.totalSystemCost * 100).toFixed(1) },
    { component: 'Battery Storage', cost: pvCalculations.costs.battery, percentage: (pvCalculations.costs.battery / pvCalculations.totalSystemCost * 100).toFixed(1) },
    { component: 'Inverter', cost: pvCalculations.costs.inverter, percentage: (pvCalculations.costs.inverter / pvCalculations.totalSystemCost * 100).toFixed(1) },
    { component: 'Installation', cost: pvCalculations.costs.installation, percentage: (pvCalculations.costs.installation / pvCalculations.totalSystemCost * 100).toFixed(1) }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="pv-recommendations">
      <h2>☀️ Photovoltaic System Recommendations</h2>
      
      {/* Configuration Panel */}
      <PVConfigPanel config={config} onConfigChange={setConfig} />
      
      <div className="summary-cards">
        <div className="summary-card highlight">
          <h3>Daily Energy Need</h3>
          <p className="big-number">{pvCalculations.dailyEnergyKwh.toFixed(2)} kWh</p>
          <small>Average daily consumption</small>
        </div>
        
        <div className="summary-card highlight">
          <h3>Peak Power Need</h3>
          <p className="big-number">{pvCalculations.peakPowerKw.toFixed(2)} kW</p>
          <small>Maximum simultaneous load</small>
        </div>
        
        <div className="summary-card highlight">
          <h3>Recommended PV Size</h3>
          <p className="big-number">{pvCalculations.pvArraySizeKw.toFixed(2)} kW</p>
          <small>Solar panel capacity needed</small>
        </div>
        
        <div className="summary-card highlight">
          <h3>Estimated Payback</h3>
          <p className="big-number">{pvCalculations.paybackYears.toFixed(1)} years</p>
          <small>Return on investment</small>
        </div>
      </div>

      <div className="system-options">
        <h3>System Sizing Options</h3>
        <div className="options-grid">
          {systemOptions.map((option, index) => (
            <div key={index} className={`option-card ${option.name.toLowerCase()}`}>
              <h4>{option.name} System</h4>
              <p className="option-description">{option.description}</p>
              
              <div className="option-specs">
                <div className="spec-row">
                  <span>PV Array:</span>
                  <span>{option.pvSize.toFixed(2)} kW ({option.panels} panels)</span>
                </div>
                <div className="spec-row">
                  <span>Battery:</span>
                  <span>{option.battery.toFixed(2)} kWh</span>
                </div>
                <div className="spec-row">
                  <span>Energy Offset:</span>
                  <span>{option.offset.toFixed(1)}%</span>
                </div>
                <div className="spec-row total-cost">
                  <span>Total Cost:</span>
                  <span>{option.cost.toLocaleString('ro-RO')} RON</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={costBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ component, percentage }) => `${component}: ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="cost"
              >
                {costBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toLocaleString('ro-RO')} RON`, 'Cost']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>System Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={systemOptions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" label={{ value: 'Cost (RON)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'PV Size (kW)', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'cost' ? `${value.toLocaleString('ro-RO')} RON` : `${value.toFixed(2)} kW`,
                  name === 'cost' ? 'Total Cost' : 'PV Array Size'
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="cost" fill="#0088FE" name="cost" />
              <Bar yAxisId="right" dataKey="pvSize" fill="#00C49F" name="pvSize" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="technical-specs">
        <h3>📋 Technical Specifications (Optimal System)</h3>
        <div className="specs-grid">
          <div className="spec-group">
            <h4>Solar Array</h4>
            <div className="spec-list">
              <div className="spec-item">
                <span>Total Capacity:</span>
                <span>{pvCalculations.pvArraySizeKw.toFixed(2)} kW</span>
              </div>
              <div className="spec-item">
                <span>Number of Panels:</span>
                <span>{pvCalculations.numberOfPanels} × {pvCalculations.configUsed.panelWattage}W</span>
              </div>
              <div className="spec-item">
                <span>Annual Production:</span>
                <span>{pvCalculations.annualEnergyProduction.toFixed(0)} kWh</span>
              </div>
              <div className="spec-item">
                <span>Energy Offset:</span>
                <span>{pvCalculations.energyOffsetPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="spec-group">
            <h4>Energy Storage</h4>
            <div className="spec-list">
              <div className="spec-item">
                <span>Battery Capacity:</span>
                <span>{pvCalculations.batteryCapacityKwh.toFixed(2)} kWh</span>
              </div>
              <div className="spec-item">
                <span>Autonomy:</span>
                <span>{config.battery.autonomyDays} days</span>
              </div>
              <div className="spec-item">
                <span>Technology:</span>
                <span>{config.battery.batteryTechnology}</span>
              </div>
              <div className="spec-item">
                <span>Cycle Life:</span>
                <span>{config.battery.batteryCycleLife.toLocaleString()}+ cycles</span>
              </div>
            </div>
          </div>

          <div className="spec-group">
            <h4>Power Electronics</h4>
            <div className="spec-list">
              <div className="spec-item">
                <span>Inverter Size:</span>
                <span>{pvCalculations.inverterSizeKw.toFixed(2)} kW</span>
              </div>
              <div className="spec-item">
                <span>Type:</span>
                <span>{config.inverter.inverterType}</span>
              </div>
              <div className="spec-item">
                <span>Efficiency:</span>
                <span>{(config.inverter.inverterEfficiency * 100).toFixed(0)}%+</span>
              </div>
              <div className="spec-item">
                <span>Monitoring:</span>
                <span>Smart monitoring included</span>
              </div>
            </div>
          </div>

          <div className="spec-group">
            <h4>Financial Summary</h4>
            <div className="spec-list">
              <div className="spec-item">
                <span>Total Investment:</span>
                <span>{pvCalculations.totalSystemCost.toLocaleString('ro-RO')} RON</span>
              </div>
              <div className="spec-item">
                <span>Electricity Price:</span>
                <span>{pvCalculations.electricityCostPerKwh.toFixed(2)} RON/kWh</span>
              </div>
              <div className="spec-item">
                <span>Annual Savings:</span>
                <span>{pvCalculations.annualSavings.toLocaleString('ro-RO')} RON</span>
              </div>
              <div className="spec-item">
                <span>Payback Period:</span>
                <span>{pvCalculations.paybackYears.toFixed(1)} years</span>
              </div>
              <div className="spec-item">
                <span>25-year ROI:</span>
                <span>{(((pvCalculations.annualSavings * 25) / pvCalculations.totalSystemCost - 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
          
          <div className="spec-group">
            <h4>Calculation Parameters</h4>
            <div className="spec-list">
              <div className="spec-item">
                <span>Peak Sun Hours:</span>
                <span>{pvCalculations.configUsed.peakSunHours} h/day</span>
              </div>
              <div className="spec-item">
                <span>Production Ratio:</span>
                <span>{pvCalculations.configUsed.productionRatio}</span>
              </div>
              <div className="spec-item">
                <span>Panel Area:</span>
                <span>{pvCalculations.configUsed.panelAreaM2} m²/panel</span>
              </div>
              <div className="spec-item">
                <span>Total Roof Area:</span>
                <span>{(pvCalculations.numberOfPanels * pvCalculations.configUsed.panelAreaM2).toFixed(0)} m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recommendations-footer">
        <h3>💡 Engineering Recommendations</h3>
        <div className="recommendations-list">
          <div className="recommendation">
            <strong>System Sizing:</strong>
            <p>Based on your consumption patterns, the optimal system should include {pvCalculations.numberOfPanels} solar panels 
            ({pvCalculations.configUsed.panelWattage}W each) with {pvCalculations.batteryCapacityKwh.toFixed(1)} kWh of battery 
            storage to ensure reliable power supply. Total roof area required: ~{(pvCalculations.numberOfPanels * pvCalculations.configUsed.panelAreaM2).toFixed(0)} m².</p>
          </div>
          
          <div className="recommendation">
            <strong>Installation Considerations:</strong>
            <p>Ensure optimal panel orientation (south-facing, 30-45° tilt for maximum efficiency). 
            Consider shading analysis and local building codes. Reserve space for future system expansion.
            Based on E.ON data, with {pvCalculations.configUsed.peakSunHours} peak sun hours/day in Romania, 
            your system should produce approximately {pvCalculations.annualEnergyProduction.toFixed(0)} kWh annually.</p>
          </div>
          
          <div className="recommendation">
            <strong>Grid Integration:</strong>
            <p>A hybrid grid-tie system is recommended to maximize self-consumption while maintaining grid backup. 
            Consider net metering policies in your area for excess energy export.</p>
          </div>
          
          <div className="recommendation">
            <strong>Monitoring & Maintenance:</strong>
            <p>Implement smart monitoring system for real-time performance tracking. 
            Schedule annual maintenance checks and panel cleaning for optimal performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PVRecommendations;