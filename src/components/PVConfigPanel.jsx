import React, { useState } from 'react';
import { defaultPVConfig, validateConfig } from '../config/pvSystemConfig';
import './PVConfigPanel.css';

const PVConfigPanel = ({ config, onConfigChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localConfig, setLocalConfig] = useState(config || defaultPVConfig);
  const [validationResult, setValidationResult] = useState({ isValid: true, warnings: [] });

  const handleFieldChange = (category, field, value) => {
    const newConfig = {
      ...localConfig,
      [category]: {
        ...localConfig[category],
        [field]: parseFloat(value) || 0,
      },
    };
    setLocalConfig(newConfig);
    
    // Validate on change
    const validation = validateConfig(newConfig);
    setValidationResult(validation);
  };

  const handleApplyConfig = () => {
    if (onConfigChange) {
      onConfigChange(localConfig);
    }
    setIsExpanded(false);
  };

  const handleResetToDefaults = () => {
    setLocalConfig(defaultPVConfig);
    setValidationResult({ isValid: true, warnings: [] });
    if (onConfigChange) {
      onConfigChange(defaultPVConfig);
    }
  };

  return (
    <div className="pv-config-panel">
      <h3>⚙️ Configurare Parametri Sistem Fotovoltaic</h3>
      
      <button
        className={`config-toggle-btn ${isExpanded ? 'active' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{isExpanded ? '▼' : '▶'}</span>
        {isExpanded ? 'Ascunde Configurare' : 'Afișează Configurare Avansată'}
      </button>

      {isExpanded && (
        <>
          <div className="config-sections">
            {/* Solar Panel Configuration */}
            <div className="config-section">
              <h4>☀️ Panouri Solare</h4>
              
              <div className="config-field">
                <label htmlFor="panelWattage">Putere Panou (W)</label>
                <input
                  type="number"
                  id="panelWattage"
                  value={localConfig.solar.panelWattage}
                  onChange={(e) => handleFieldChange('solar', 'panelWattage', e.target.value)}
                  min="250"
                  max="600"
                  step="5"
                />
                <small>Interval tipic: 250-550W (E.ON: 415W)</small>
              </div>

              <div className="config-field">
                <label htmlFor="panelEfficiency">Eficiență Sistem (%)</label>
                <input
                  type="number"
                  id="panelEfficiency"
                  value={(localConfig.solar.panelEfficiency * 100).toFixed(0)}
                  onChange={(e) => handleFieldChange('solar', 'panelEfficiency', e.target.value / 100)}
                  min="70"
                  max="95"
                  step="1"
                />
                <small>Eficiența totală a sistemului</small>
              </div>

              <div className="config-field">
                <label htmlFor="peakSunHours">Ore Solare Maxime/Zi</label>
                <input
                  type="number"
                  id="peakSunHours"
                  value={localConfig.solar.peakSunHours}
                  onChange={(e) => handleFieldChange('solar', 'peakSunHours', e.target.value)}
                  min="3"
                  max="7"
                  step="0.1"
                />
                <small>Medie în România: 4.5 ore/zi</small>
              </div>

              <div className="config-field">
                <label htmlFor="productionRatio">Raport de Producție</label>
                <input
                  type="number"
                  id="productionRatio"
                  value={localConfig.solar.productionRatio}
                  onChange={(e) => handleFieldChange('solar', 'productionRatio', e.target.value)}
                  min="1.0"
                  max="2.0"
                  step="0.1"
                />
                <small>E.ON România: 1.3-1.6</small>
              </div>

              <div className="config-field">
                <label htmlFor="panelCostPerWatt">Cost Panou (RON/W)</label>
                <input
                  type="number"
                  id="panelCostPerWatt"
                  value={localConfig.solar.panelCostPerWatt}
                  onChange={(e) => handleFieldChange('solar', 'panelCostPerWatt', e.target.value)}
                  min="1"
                  max="10"
                  step="0.1"
                />
                <small>Preț piață: ~3.98 RON/W</small>
              </div>

              <div className="config-field">
                <label htmlFor="panelAreaM2">Suprafață Panou (m²)</label>
                <input
                  type="number"
                  id="panelAreaM2"
                  value={localConfig.solar.panelAreaM2}
                  onChange={(e) => handleFieldChange('solar', 'panelAreaM2', e.target.value)}
                  min="1.5"
                  max="3"
                  step="0.1"
                />
                <small>E.ON estimare: ~2 m²/panou</small>
              </div>
            </div>

            {/* Battery Storage Configuration */}
            <div className="config-section">
              <h4>🔋 Stocare Baterii</h4>
              
              <div className="config-field">
                <label htmlFor="autonomyDays">Zile Autonomie</label>
                <input
                  type="number"
                  id="autonomyDays"
                  value={localConfig.battery.autonomyDays}
                  onChange={(e) => handleFieldChange('battery', 'autonomyDays', e.target.value)}
                  min="1"
                  max="5"
                  step="1"
                />
                <small>Zile de rezervă energie</small>
              </div>

              <div className="config-field">
                <label htmlFor="batteryEfficiency">Eficiență Baterie (%)</label>
                <input
                  type="number"
                  id="batteryEfficiency"
                  value={(localConfig.battery.batteryEfficiency * 100).toFixed(0)}
                  onChange={(e) => handleFieldChange('battery', 'batteryEfficiency', e.target.value / 100)}
                  min="70"
                  max="98"
                  step="1"
                />
                <small>Eficiență round-trip</small>
              </div>

              <div className="config-field">
                <label htmlFor="batteryCycleLife">Cicli de Viață</label>
                <input
                  type="number"
                  id="batteryCycleLife"
                  value={localConfig.battery.batteryCycleLife}
                  onChange={(e) => handleFieldChange('battery', 'batteryCycleLife', e.target.value)}
                  min="3000"
                  max="10000"
                  step="100"
                />
                <small>Număr cicli încărcare/descărcare</small>
              </div>

              <div className="config-field">
                <label htmlFor="batteryCostPerKwh">Cost Baterie (RON/kWh)</label>
                <input
                  type="number"
                  id="batteryCostPerKwh"
                  value={localConfig.battery.batteryCostPerKwh}
                  onChange={(e) => handleFieldChange('battery', 'batteryCostPerKwh', e.target.value)}
                  min="1000"
                  max="5000"
                  step="50"
                />
                <small>Preț piață: ~1,988 RON/kWh</small>
              </div>
            </div>

            {/* Inverter Configuration */}
            <div className="config-section">
              <h4>⚡ Invertor</h4>
              
              <div className="config-field">
                <label htmlFor="safetyMargin">Marjă Siguranță (%)</label>
                <input
                  type="number"
                  id="safetyMargin"
                  value={((localConfig.inverter.safetyMargin - 1) * 100).toFixed(0)}
                  onChange={(e) => handleFieldChange('inverter', 'safetyMargin', 1 + (e.target.value / 100))}
                  min="10"
                  max="50"
                  step="5"
                />
                <small>Peste sarcina maximă</small>
              </div>

              <div className="config-field">
                <label htmlFor="inverterCostPerKw">Cost Invertor (RON/kW)</label>
                <input
                  type="number"
                  id="inverterCostPerKw"
                  value={localConfig.inverter.inverterCostPerKw}
                  onChange={(e) => handleFieldChange('inverter', 'inverterCostPerKw', e.target.value)}
                  min="500"
                  max="3000"
                  step="50"
                />
                <small>Preț piață: ~1,491 RON/kW</small>
              </div>

              <div className="config-field">
                <label htmlFor="inverterEfficiency">Eficiență Invertor (%)</label>
                <input
                  type="number"
                  id="inverterEfficiency"
                  value={(localConfig.inverter.inverterEfficiency * 100).toFixed(0)}
                  onChange={(e) => handleFieldChange('inverter', 'inverterEfficiency', e.target.value / 100)}
                  min="90"
                  max="99"
                  step="1"
                />
                <small>Eficiență conversie CC → CA</small>
              </div>
            </div>

            {/* Financial Configuration */}
            <div className="config-section">
              <h4>💰 Parametri Financiari</h4>
              
              <div className="config-field">
                <label htmlFor="electricityPricePerKwh">Preț Electricitate (RON/kWh)</label>
                <input
                  type="number"
                  id="electricityPricePerKwh"
                  value={localConfig.financial.electricityPricePerKwh}
                  onChange={(e) => handleFieldChange('financial', 'electricityPricePerKwh', e.target.value)}
                  min="0.5"
                  max="2.0"
                  step="0.01"
                />
                <small>Prețul curent al energiei electrice</small>
              </div>

              <div className="config-field">
                <label htmlFor="installationMultiplier">Cost Instalare (%)</label>
                <input
                  type="number"
                  id="installationMultiplier"
                  value={((localConfig.installation.installationMultiplier - 1) * 100).toFixed(0)}
                  onChange={(e) => handleFieldChange('installation', 'installationMultiplier', 1 + (e.target.value / 100))}
                  min="20"
                  max="50"
                  step="5"
                />
                <small>Procent adăugat pentru montaj, cablare</small>
              </div>

              <div className="config-field">
                <label htmlFor="eurToRonRate">Curs EUR → RON</label>
                <input
                  type="number"
                  id="eurToRonRate"
                  value={localConfig.financial.eurToRonRate}
                  onChange={(e) => handleFieldChange('financial', 'eurToRonRate', e.target.value)}
                  min="4.5"
                  max="5.5"
                  step="0.01"
                />
                <small>Cursul valutar curent</small>
              </div>
            </div>
          </div>

          {/* Validation Warnings */}
          {validationResult.warnings.length > 0 && (
            <div className="config-warning">
              <h5>⚠️ Avertismente de Validare:</h5>
              {validationResult.warnings.map((warning, index) => (
                <p key={index}>• {warning}</p>
              ))}
            </div>
          )}

          {/* E.ON Reference Data */}
          <div className="config-info-box">
            <h5>📊 Date de Referință E.ON România</h5>
            <p><strong>Consum mediu anual:</strong> {defaultPVConfig.eonReference.avgAnnualConsumption.toLocaleString()} kWh/an</p>
            <p><strong>Raport producție:</strong> {defaultPVConfig.solar.productionRatio} (interval: 1.3-1.6)</p>
            <p><strong>Putere panou standard:</strong> {defaultPVConfig.solar.panelWattage}W</p>
            
            <div className="eon-reference-table">
              <table>
                <thead>
                  <tr>
                    <th>Sistem (kW)</th>
                    <th>Panouri</th>
                    <th>Suprafață (m²)</th>
                    <th>Producție Anuală (kWh)</th>
                  </tr>
                </thead>
                <tbody>
                  {defaultPVConfig.eonReference.systemSizes.map((system, index) => (
                    <tr key={index}>
                      <td>{system.kw} kW</td>
                      <td>{system.panels} buc</td>
                      <td>{system.areaM2} m²</td>
                      <td>{system.annualProduction.toLocaleString()} kWh</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="config-actions">
            <button className="config-btn config-btn-primary" onClick={handleApplyConfig}>
              ✓ Aplică Configurația
            </button>
            <button className="config-btn config-btn-secondary" onClick={handleResetToDefaults}>
              ↺ Resetare la Valori Implicite
            </button>
            <button className="config-btn config-btn-secondary" onClick={() => setIsExpanded(false)}>
              ✕ Anulare
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PVConfigPanel;
