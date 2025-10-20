/**
 * PV System Configuration Parameters
 * Based on Romanian market data and E.ON recommendations
 * 
 * Sources:
 * - E.ON Romania: https://www.eon.ro/statie-energie/ghid-consum/cate-panouri-fotovoltaice-sunt-necesare-unei-case-din-romania
 * - Industry standards and market research
 */

export const defaultPVConfig = {
  // Solar Panel Parameters
  solar: {
    panelWattage: 415, // Watts per panel (E.ON uses 415W, range: 250-550W)
    panelEfficiency: 0.85, // Overall system efficiency (85%)
    peakSunHours: 4.5, // Average peak sun hours per day in Romania
    productionRatio: 1.3, // Production ratio for Romania (E.ON: 1.3-1.6)
    panelCostPerWatt: 3.98, // RON per Watt (based on ~0.8 EUR/W)
    panelAreaM2: 2.0, // Square meters per panel (E.ON estimate)
  },

  // Battery Storage Parameters
  battery: {
    autonomyDays: 2, // Days of battery autonomy
    batteryEfficiency: 0.9, // Round-trip efficiency (90%)
    batteryCycleLife: 5000, // Number of charge/discharge cycles
    batteryCostPerKwh: 1988, // RON per kWh (based on ~400 EUR/kWh)
    batteryTechnology: 'Lithium-ion',
  },

  // Inverter Parameters
  inverter: {
    safetyMargin: 1.2, // 20% safety margin over peak load
    inverterCostPerKw: 1491, // RON per kW (based on ~300 EUR/kW)
    inverterType: 'Hybrid Grid-tie',
    inverterEfficiency: 0.97, // 97% efficiency
  },

  // Installation and Additional Costs
  installation: {
    installationMultiplier: 1.3, // 30% additional for installation, wiring, etc.
    warrantyYears: 25, // Standard warranty period
  },

  // Financial Parameters
  financial: {
    electricityPricePerKwh: 0.80, // RON per kWh (default electricity price)
    eurToRonRate: 4.97, // EUR to RON conversion rate
    vatRate: 0.19, // 19% VAT (if applicable)
  },

  // System Sizing Options Multipliers
  systemOptions: {
    conservative: {
      pvMultiplier: 0.8,
      batteryMultiplier: 0.6,
      costMultiplier: 0.75,
      offsetMultiplier: 0.8,
    },
    optimal: {
      pvMultiplier: 1.0,
      batteryMultiplier: 1.0,
      costMultiplier: 1.0,
      offsetMultiplier: 1.0,
    },
    aggressive: {
      pvMultiplier: 1.3,
      batteryMultiplier: 1.2,
      costMultiplier: 1.4,
      offsetMultiplier: 1.3,
    },
  },

  // E.ON Reference Data (for validation)
  eonReference: {
    // Average annual consumption for a household
    avgAnnualConsumption: 2500, // kWh/year
    // System sizes and expected production (from E.ON table)
    systemSizes: [
      { kw: 3, panels: 7, areaM2: 15, annualProduction: 3800 },
      { kw: 5, panels: 12, areaM2: 26, annualProduction: 6300 },
      { kw: 6, panels: 14, areaM2: 30, annualProduction: 7600 },
      { kw: 8, panels: 18, areaM2: 40, annualProduction: 10200 },
      { kw: 10, panels: 23, areaM2: 50, annualProduction: 12700 },
      { kw: 12, panels: 27, areaM2: 60, annualProduction: 15300 },
      { kw: 15, panels: 34, areaM2: 75, annualProduction: 19100 },
      { kw: 20, panels: 45, areaM2: 99, annualProduction: 25500 },
    ],
  },
};

/**
 * Validates configuration values
 * @param {Object} config - Configuration object to validate
 * @returns {Object} Validated configuration with warnings
 */
export const validateConfig = (config) => {
  const warnings = [];

  if (config.solar?.panelWattage < 250 || config.solar?.panelWattage > 600) {
    warnings.push('Panel wattage outside typical range (250-600W)');
  }

  if (config.solar?.productionRatio < 1.0 || config.solar?.productionRatio > 2.0) {
    warnings.push('Production ratio outside typical range (1.0-2.0)');
  }

  if (config.battery?.batteryEfficiency < 0.7 || config.battery?.batteryEfficiency > 0.98) {
    warnings.push('Battery efficiency outside typical range (70-98%)');
  }

  if (config.inverter?.inverterEfficiency < 0.90 || config.inverter?.inverterEfficiency > 0.99) {
    warnings.push('Inverter efficiency outside typical range (90-99%)');
  }

  return { isValid: warnings.length === 0, warnings };
};

/**
 * Merges user configuration with defaults
 * @param {Object} userConfig - User's custom configuration
 * @returns {Object} Merged configuration
 */
export const mergeConfig = (userConfig) => {
  return {
    solar: { ...defaultPVConfig.solar, ...userConfig.solar },
    battery: { ...defaultPVConfig.battery, ...userConfig.battery },
    inverter: { ...defaultPVConfig.inverter, ...userConfig.inverter },
    installation: { ...defaultPVConfig.installation, ...userConfig.installation },
    financial: { ...defaultPVConfig.financial, ...userConfig.financial },
    systemOptions: { ...defaultPVConfig.systemOptions, ...userConfig.systemOptions },
  };
};
