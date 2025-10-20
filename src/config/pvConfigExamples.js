/**
 * Example PV System Configurations for Different Scenarios
 * These can be imported and used with the mergeConfig function
 */

// Scenario 1: Budget-Conscious Configuration
export const budgetConfig = {
  solar: {
    panelWattage: 380, // Lower wattage, more affordable panels
    panelCostPerWatt: 3.50, // Lower cost panels
  },
  battery: {
    autonomyDays: 1, // Minimal battery storage
    batteryCostPerKwh: 1800, // Budget battery option
  },
  inverter: {
    inverterCostPerKw: 1300, // Standard inverter
  },
  installation: {
    installationMultiplier: 1.25, // Lower installation costs
  },
};

// Scenario 2: Premium High-Efficiency Configuration
export const premiumConfig = {
  solar: {
    panelWattage: 550, // High-efficiency panels
    panelEfficiency: 0.90, // Top-tier efficiency
    panelCostPerWatt: 4.50, // Premium panels
  },
  battery: {
    autonomyDays: 3, // Extended autonomy
    batteryEfficiency: 0.95, // Premium batteries
    batteryCostPerKwh: 2200, // High-quality storage
  },
  inverter: {
    inverterEfficiency: 0.98, // Premium inverter
    inverterCostPerKw: 1700,
  },
  installation: {
    installationMultiplier: 1.35, // Professional installation
  },
};

// Scenario 3: Northern Romania (Lower Solar Irradiance)
export const northernRomaniaConfig = {
  solar: {
    peakSunHours: 4.0, // Lower sun hours in northern regions
    productionRatio: 1.2, // Conservative ratio
  },
  systemOptions: {
    optimal: {
      pvMultiplier: 1.15, // Slightly oversized to compensate
      batteryMultiplier: 1.1,
      costMultiplier: 1.1,
      offsetMultiplier: 1.0,
    },
  },
};

// Scenario 4: Southern Romania (Higher Solar Irradiance)
export const southernRomaniaConfig = {
  solar: {
    peakSunHours: 5.2, // Higher sun hours in southern regions
    productionRatio: 1.5, // Optimistic ratio for sunny areas
  },
  systemOptions: {
    optimal: {
      pvMultiplier: 0.95, // Can be slightly smaller
      batteryMultiplier: 0.9,
      costMultiplier: 0.95,
      offsetMultiplier: 1.1,
    },
  },
};

// Scenario 5: Off-Grid Configuration
export const offGridConfig = {
  battery: {
    autonomyDays: 4, // Longer autonomy for off-grid
    batteryEfficiency: 0.92,
    batteryCostPerKwh: 2100,
  },
  inverter: {
    safetyMargin: 1.5, // Higher safety margin for off-grid
  },
  systemOptions: {
    optimal: {
      pvMultiplier: 1.4, // Oversized for reliability
      batteryMultiplier: 1.5,
      costMultiplier: 1.6,
      offsetMultiplier: 1.2,
    },
  },
};

// Scenario 6: Grid-Tied with Minimal Battery
export const gridTiedMinimalConfig = {
  battery: {
    autonomyDays: 0.5, // Minimal backup, mostly grid-tied
    batteryCostPerKwh: 1700,
  },
  inverter: {
    inverterType: 'Grid-tie with Backup',
  },
  systemOptions: {
    conservative: {
      pvMultiplier: 0.7,
      batteryMultiplier: 0.3, // Very small battery
      costMultiplier: 0.65,
      offsetMultiplier: 0.7,
    },
  },
};

// Scenario 7: Future-Proof with EV Charging
export const evReadyConfig = {
  solar: {
    panelWattage: 500,
  },
  inverter: {
    safetyMargin: 1.4, // Extra capacity for EV charging
  },
  systemOptions: {
    aggressive: {
      pvMultiplier: 1.6, // Much larger for EV
      batteryMultiplier: 1.4,
      costMultiplier: 1.7,
      offsetMultiplier: 1.4,
    },
  },
  financial: {
    electricityPricePerKwh: 0.90, // Higher price expectation
  },
};

// Scenario 8: 2024 Current Market Prices (Updated)
export const currentMarket2024Config = {
  solar: {
    panelCostPerWatt: 4.20, // Current market prices
  },
  battery: {
    batteryCostPerKwh: 2100, // Updated battery costs
  },
  inverter: {
    inverterCostPerKw: 1550,
  },
  financial: {
    electricityPricePerKwh: 0.85, // Current electricity price
    eurToRonRate: 4.97, // Current exchange rate
  },
  installation: {
    installationMultiplier: 1.32, // Current installation costs
  },
};

// Scenario 9: Mountain/High Altitude Areas
export const mountainConfig = {
  solar: {
    peakSunHours: 4.8, // Better sun at altitude
    productionRatio: 1.4,
    panelEfficiency: 0.82, // Lower temps improve efficiency
  },
  battery: {
    autonomyDays: 3, // More autonomy needed
    batteryEfficiency: 0.88, // Batteries less efficient in cold
  },
};

// Scenario 10: Urban High-Rise Installation
export const urbanHighRiseConfig = {
  solar: {
    peakSunHours: 3.8, // Potential shading from buildings
    productionRatio: 1.1,
  },
  installation: {
    installationMultiplier: 1.45, // Higher installation costs
  },
  systemOptions: {
    optimal: {
      pvMultiplier: 1.2, // Compensate for shading
      batteryMultiplier: 1.0,
      costMultiplier: 1.15,
      offsetMultiplier: 0.95,
    },
  },
};

// Usage example in your application:
/*
import { mergeConfig } from './pvSystemConfig';
import { premiumConfig, southernRomaniaConfig } from './pvConfigExamples';

// Combine multiple configurations
const myConfig = mergeConfig({
  ...premiumConfig,
  ...southernRomaniaConfig,
  financial: {
    electricityPricePerKwh: 0.92, // My specific price
  }
});
*/
