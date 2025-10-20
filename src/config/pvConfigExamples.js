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
    panelEfficiency: 0.88, // Cooler air improves efficiency above baseline
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

export const scenarioPresets = [
  {
    id: 'budget',
    label: 'Budget',
    description: 'Economical configuration with minimal costs',
    config: budgetConfig,
  },
  {
    id: 'premium',
    label: 'Premium',
    description: 'High-end equipment for maximum efficiency and reliability',
    config: premiumConfig,
  },
  {
    id: 'north-ro',
    label: 'North Romania',
    description: 'Optimized for regions with lower solar irradiation (Cluj, Maramureș, etc.)',
    config: northernRomaniaConfig,
  },
  {
    id: 'south-ro',
    label: 'South Romania',
    description: 'Adjusts for higher irradiation in southern areas (Bucharest, Constanța, etc.)',
    config: southernRomaniaConfig,
  },
  {
    id: 'off-grid',
    label: 'Off-Grid',
    description: 'Complete autonomy with extended battery and inverter sizing',
    config: offGridConfig,
  },
  {
    id: 'grid-minimal',
    label: 'Grid-Tied Minimal',
    description: 'Minimal battery storage while remaining grid connected',
    config: gridTiedMinimalConfig,
  },
  {
    id: 'ev-ready',
    label: 'EV Ready',
    description: 'Dimensioned for homes that plan to charge an electric vehicle',
    config: evReadyConfig,
  },
  {
    id: 'market-2024',
    label: 'Market 2024',
    description: 'Reflects October 2025 market prices for equipment and energy',
    config: currentMarket2024Config,
  },
  {
    id: 'mountain',
    label: 'Mountain',
    description: 'Tailored for high altitude sites with cooler temperatures',
    config: mountainConfig,
  },
  {
    id: 'urban',
    label: 'Urban',
    description: 'Adapts for tall buildings and possible shading in cities',
    config: urbanHighRiseConfig,
  },
];

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
