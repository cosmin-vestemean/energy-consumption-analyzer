# Electric Consumption Analyzer - Technical Analysis & Formulas

**Document Version:** 1.0  
**Date:** October 20, 2025  
**Application:** Electric Consumption Analyzer for PV System Design

---

## Table of Contents

1. [Overview](#overview)
2. [Data Processing](#data-processing)
3. [Statistical Analysis](#statistical-analysis)
4. [Consumption Pattern Analysis](#consumption-pattern-analysis)
5. [PV System Sizing Calculations](#pv-system-sizing-calculations)
6. [Financial Analysis](#financial-analysis)
7. [Assumptions & Constants](#assumptions--constants)

---

## Overview

This document provides complete transparency on all calculations, formulas, and methodologies used in the Electric Consumption Analyzer application. The system analyzes hourly/daily energy consumption data to provide comprehensive statistics and photovoltaic (PV) system recommendations.

---

## Data Processing

### Input Data Format

The application accepts Excel files with the following columns:
- **energie (kwh)**: Energy consumption in kilowatt-hours
- **ora**: Hour of day (0-23)
- **zi**: Day of month (1-31)
- **luna**: Month (1-12)

### Data Validation

Each data point is validated against the following criteria:

```
✓ energie ≥ 0 (allows zero consumption)
✓ 0 ≤ ora ≤ 23
✓ 1 ≤ zi ≤ 31
✓ 1 ≤ luna ≤ 12
```

**Data Handling:**
- Zero consumption values are retained (important for nighttime readings)
- Invalid or incomplete rows are filtered out
- All valid data points are included in calculations

---

## Statistical Analysis

### 1. Basic Statistics

#### Total Consumption
```
Total Consumption = Σ(energie_i) for all i data points

Where:
  energie_i = energy consumption at reading i
```

#### Average Hourly Consumption
```
Average Hourly Consumption = Total Consumption / Number of Data Points

Formula: avg = Σ(E_i) / n

Where:
  E_i = energy value at reading i
  n = total number of readings
```

#### Maximum & Minimum Consumption
```
Maximum Consumption = max(energie_i) for all i
Minimum Consumption = min(energie_i) for all i
```

### 2. Hourly Statistics

For each hour h (0-23):

```
Hourly Average(h) = Σ(E_h,i) / n_h

Hourly Maximum(h) = max(E_h,i)

Hourly Minimum(h) = min(E_h,i)

Where:
  E_h,i = energy consumption at hour h for occurrence i
  n_h = number of readings at hour h
```

### 3. Daily Statistics

```
Daily Total(d) = Σ(energie_i) for all readings on day d

Daily Average = Σ(Daily Total_d) / Number of Days

Daily Maximum = max(Daily Total_d)

Daily Minimum = min(Daily Total_d)

Where:
  d = unique day identifier (day-month combination)
```

---

## Consumption Pattern Analysis

### 1. Peak vs Off-Peak Analysis

**Peak Hours Definition:** 10:00 - 19:00 (10 AM - 7 PM)  
**Off-Peak Hours Definition:** 00:00 - 06:00, 22:00 - 23:00 (12 AM - 6 AM, 10 PM - 11 PM)

```
Peak Average = Σ(E_peak) / n_peak

Off-Peak Average = Σ(E_off-peak) / n_off-peak

Peak-to-Off-Peak Ratio = Peak Average / Off-Peak Average

Where:
  E_peak = energy consumption during peak hours
  E_off-peak = energy consumption during off-peak hours
  n_peak = number of peak readings
  n_off-peak = number of off-peak readings
```

### 2. Load Factor

Load factor indicates how efficiently the energy system is utilized:

```
Load Factor = (Average Consumption / Peak Consumption) × 100%

Formula: LF = (P_avg / P_max) × 100

Where:
  P_avg = average hourly consumption
  P_max = maximum hourly consumption

Interpretation:
  LF > 70%: High and consistent energy usage (efficient)
  40% < LF ≤ 70%: Moderate usage with some peaks
  LF ≤ 40%: High variability, peak-dominated usage
```

### 3. Consumption Variability

#### Variance
```
Variance = Σ((E_i - μ)²) / n

Where:
  E_i = energy value at reading i
  μ = mean (average) consumption
  n = total number of readings
```

#### Standard Deviation
```
Standard Deviation (σ) = √Variance

σ = √[Σ((E_i - μ)²) / n]
```

#### Coefficient of Variation (CV)
```
Coefficient of Variation = (σ / μ) × 100%

Interpretation:
  CV > 100%: Very high variability
  50% < CV ≤ 100%: Moderate variability
  CV ≤ 50%: Low variability, consistent usage
```

### 4. Consumption Distribution

Data is categorized into consumption ranges:
- 0-1 kWh
- 1-5 kWh
- 5-10 kWh
- 10-20 kWh
- 20-30 kWh
- 30+ kWh

```
Percentage in Range = (Count in Range / Total Readings) × 100%
```

---

## PV System Sizing Calculations

### ⚙️ Version 2.0 - Parametrizable System

**IMPORTANT:** Starting with version 2.0, all calculation parameters are now fully configurable through the application interface. The values below represent the **default settings** based on E.ON Romania data and industry standards.

For complete customization options, see **PV_PARAMETRIZATION_GUIDE.md** or access the configuration panel in the application.

### Assumptions & Constants (Default Values)

**Note:** These are configurable parameters with ranges shown in parentheses.

```
System Efficiency (η_sys) = 0.85 (85%) [configurable: 70-95%]
Panel Wattage (P_panel) = 415 W [configurable: 250-600W, E.ON standard]
Peak Sun Hours (PSH) = 4.5 hours/day [configurable: 3.0-7.0h, Romania average]
Autonomy Days (D_auto) = 2 days [configurable: 0.5-5 days]
Battery Efficiency (η_bat) = 0.9 (90%) [configurable: 70-98%]
Battery Cycle Life = 5000 cycles [configurable: 3000-10000]
Inverter Safety Margin = 1.2 (20% oversizing) [configurable: 1.1-1.5]
Electricity Price = 0.80 RON/kWh [configurable: 0.50-2.00 RON/kWh]
Production Ratio = 1.3 [configurable: 1.0-2.0, E.ON: 1.3-1.6]
```

**Reference Source:** E.ON Romania - "Câte panouri fotovoltaice sunt necesare unei case din România?"

### 1. Solar Array Sizing

#### Required PV Array Capacity
```
PV Array Size (kW) = (Daily Energy Need / Peak Sun Hours) / System Efficiency

Formula: P_pv = (E_daily / PSH) / η_sys

Where:
  E_daily = average daily consumption (kWh)
  PSH = peak sun hours per day (hours) [default: 4.5, range: 3.0-7.0]
  η_sys = overall system efficiency [default: 0.85, range: 0.70-0.95]

Example (using default values):
  If E_daily = 30 kWh
  P_pv = (30 / 4.5) / 0.85 = 7.84 kW
```

#### Number of Solar Panels
```
Number of Panels = ⌈(PV Array Size × 1000) / Panel Wattage⌉

Formula: N_panels = ⌈(P_pv × 1000) / P_panel⌉

Where:
  ⌈ ⌉ = ceiling function (round up)
  P_pv = PV array size in kW
  P_panel = individual panel wattage [default: 415W, range: 250-600W]

Example (using default 415W panels):
  N_panels = ⌈(7.84 × 1000) / 415⌉ = ⌈18.9⌉ = 19 panels
  
Note: With older 400W panels: ⌈(7.84 × 1000) / 400⌉ = 20 panels
```

### 2. Battery Storage Sizing

```
Battery Capacity (kWh) = (Daily Energy Need × Autonomy Days) / Battery Efficiency

Formula: C_bat = (E_daily × D_auto) / η_bat

Where:
  E_daily = average daily consumption (kWh)
  D_auto = days of autonomy [default: 2 days, range: 0.5-5 days]
  η_bat = battery round-trip efficiency (0.9)

Example:
  If E_daily = 30 kWh
  C_bat = (30 × 2) / 0.9 = 66.67 kWh
```

**Note:** 2 days of autonomy provides backup power during cloudy weather or system maintenance.

### 3. Inverter Sizing

```
Inverter Size (kW) = Peak Power Need × Safety Margin

Formula: P_inv = P_peak × 1.2

Where:
  P_peak = maximum hourly consumption (kW)
  1.2 = 20% safety margin for surge loads

Example:
  If P_peak = 5 kW
  P_inv = 5 × 1.2 = 6 kW
```

### 4. Annual Energy Production

```
Annual Production = PV Array Size × Peak Sun Hours × Days per Year

Formula: E_annual = P_pv × PSH × 365

Example:
  E_annual = 7.84 × 4.5 × 365 = 12,878 kWh/year
```

### 5. Energy Offset Percentage

```
Energy Offset = min((Annual Production / Annual Consumption) × 100%, 100%)

Formula: Offset = min((E_annual / E_consumption) × 100%, 100%)

Where:
  E_consumption = daily consumption × 365
```

---

## Financial Analysis

### Cost Components

#### Equipment Costs
```
Panel Cost = Number of Panels × Panel Wattage × Cost per Watt
           = N_panels × P_panel × €0.80/W

Battery Cost = Battery Capacity × Cost per kWh
             = C_bat × €400/kWh

Inverter Cost = Inverter Size × Cost per kW
              = P_inv × €300/kW
```

#### Total System Cost
```
Equipment Cost = Panel Cost + Battery Cost + Inverter Cost

Installation Cost = Equipment Cost × 0.3 (30% for installation)

Total System Cost = Equipment Cost × 1.3

Where:
  1.3 = installation multiplier [default: 1.3 (30%), range: 1.2-1.5 (20-50%)]
  Installation cost includes: labor, wiring, mounting, permits, commissioning
```

### Return on Investment (ROI)

#### Annual Savings
```
Annual Savings = Daily Energy × 365 × Electricity Rate × Energy Offset

Formula: S_annual = E_daily × 365 × Price/kWh × (Offset/100)

Assumptions:
  Electricity Rate = 0.80 RON/kWh [default for Romania, configurable: 0.50-2.00 RON/kWh]
  Note: Previous versions used €0.25/kWh (European average)
  
Example:
  If E_daily = 30 kWh, Offset = 100%, Price = 0.80 RON/kWh:
  S_annual = 30 × 365 × 0.80 × 1.0 = 8,760 RON/year
```

#### Payback Period
```
Payback Period (years) = Total System Cost / Annual Savings

Formula: T_payback = C_total / S_annual

Example:
  If C_total = €20,000 and S_annual = €2,500
  T_payback = 20,000 / 2,500 = 8 years
```

#### 25-Year Return on Investment
```
25-Year ROI = ((Annual Savings × 25) / Total System Cost - 1) × 100%

Formula: ROI_25 = ((S_annual × 25) / C_total - 1) × 100%

Example:
  ROI_25 = ((2,500 × 25) / 20,000 - 1) × 100% = 212.5%
```

---

## System Sizing Options

The application provides three system sizing strategies:

### 1. Conservative System (80% Coverage)

```
PV Array: Base PV Size × 0.8
Panels: Base Panels × 0.8
Battery: Base Battery × 0.6
Total Cost: Base Cost × 0.75
Energy Offset: Base Offset × 0.8
```

**Use Case:** Lower upfront cost, grid backup required, urban areas with reliable grid

### 2. Optimal System (100% Coverage)

```
PV Array: Base PV Size × 1.0
Panels: Base Panels × 1.0
Battery: Base Battery × 1.0
Total Cost: Base Cost × 1.0
Energy Offset: Base Offset × 1.0
```

**Use Case:** Balanced approach, maximum self-consumption, typical residential installation

### 3. Aggressive System (130% Coverage)

```
PV Array: Base PV Size × 1.3
Panels: Base Panels × 1.3
Battery: Base Battery × 1.2
Total Cost: Base Cost × 1.4
Energy Offset: min(Base Offset × 1.3, 100%)
```

**Use Case:** Future-proof, supports EV charging, allows system expansion, off-grid capable

---

## Cost Breakdown Distribution

Typical cost distribution for the optimal system:

```
Solar Panels: ~50-55% of total cost
Battery Storage: ~30-35% of total cost
Inverter: ~8-12% of total cost
Installation & Wiring: ~23% of total cost (30% of equipment cost)
```

---

## Data Aggregation for Visualization

### Large Datasets (> 1000 data points)

For performance optimization with yearly data:

```
Daily Average = Σ(E_hourly) / 24

Where data is grouped by day-month combination and averaged
```

### Small Datasets (≤ 1000 data points)

All hourly data points are displayed without aggregation.

---

## Quality Metrics & Interpretations

### Load Factor Interpretation

| Load Factor | Interpretation | System Impact |
|-------------|----------------|---------------|
| > 70% | High, consistent usage | Efficient system utilization |
| 40-70% | Moderate variability | Standard residential pattern |
| < 40% | High peak demand | Requires larger inverter |

### Coefficient of Variation Interpretation

| CV Value | Variability | Design Consideration |
|----------|-------------|---------------------|
| > 100% | Very high | Robust system with oversizing |
| 50-100% | Moderate | Standard safety margins |
| < 50% | Low | Optimized system possible |

### Peak-to-Off-Peak Ratio Interpretation

| Ratio | Pattern | Recommendation |
|-------|---------|----------------|
| > 5.0 | Very high daytime use | Excellent for PV |
| 2.0-5.0 | Normal residential | Standard PV suitable |
| < 2.0 | Evening/night heavy | Larger battery needed |

---

## Validation & Quality Assurance

### Data Quality Checks

1. **Completeness:** Verify all required fields present
2. **Range Validation:** Ensure values within physical limits
3. **Consistency:** Check for temporal continuity
4. **Outliers:** Identify extreme values for review

### Calculation Verification

All formulas are based on:
- IEEE standards for PV system design
- IEC 61724 (PV system performance monitoring)
- Industry best practices for energy system sizing
- European regulatory guidelines (where applicable)

---

## Technical References

### Standards & Guidelines
- IEC 61724: Photovoltaic system performance monitoring
- IEC 61853: Photovoltaic module performance testing
- IEEE 1562: Guide for Array and Battery Sizing in Stand-Alone PV Systems
- EN 50438: Grid connection requirements

### Engineering Assumptions Basis
- System efficiency (85%): Accounts for inverter losses, wiring losses, temperature derating, soiling
- Peak sun hours (4.5h): Based on average European solar irradiation
- Battery efficiency (90%): Typical for modern lithium-ion battery systems
- Component costs: Based on 2024-2025 market averages

---

## Disclaimer

This analysis tool provides **preliminary estimates** for educational and planning purposes. Actual system design should be performed by qualified engineers considering:

- Local solar irradiation data
- Site-specific conditions (shading, roof orientation, structural capacity)
- Local building codes and regulations
- Grid connection requirements
- Available incentives and subsidies
- Detailed load analysis including surge requirements
- Environmental factors (temperature, humidity, weather patterns)

**Professional consultation is recommended before making investment decisions.**

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-20 | System Generated | Initial documentation |

---

## Contact & Support

For questions about calculations or methodologies, please contact your technical representative.

**Application URL:** https://ubiquitous-orbit-wvp4rxqq66wfgw5q-3001.app.github.dev/

---

*This document is automatically maintained and synchronized with the application codebase.*
