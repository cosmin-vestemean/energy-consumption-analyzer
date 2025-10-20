# Electric Consumption Analyzer - Client Summary

**Application:** Energy Consumption Analysis & PV System Design Tool  
**Public URL:** https://ubiquitous-orbit-wvp4rxqq66wfgw5q-3001.app.github.dev/  
**Date:** October 20, 2025

---

## Executive Summary

This web application analyzes your electrical energy consumption data to provide:
- ✅ Comprehensive statistical analysis of usage patterns
- ✅ Identification of peak consumption periods
- ✅ Photovoltaic (solar) system sizing recommendations
- ✅ Cost estimates and return on investment calculations
- ✅ Multiple system configuration options

All calculations are transparent, based on industry standards, and designed to help you make informed decisions about solar energy investments.

---

## What the Application Does

### 1. **Data Analysis**

Your hourly/daily energy consumption data is analyzed to calculate:

- **Total Consumption**: Sum of all energy used over the period
- **Average Usage**: Mean consumption per hour and per day
- **Peak Demand**: Maximum power requirement (important for system sizing)
- **Usage Patterns**: When you use most electricity (peak vs. off-peak hours)
- **Consumption Variability**: How consistent or variable your usage is

### 2. **Pattern Recognition**

The application identifies:

- **Peak Hours**: Times of day with highest consumption (typically 10 AM - 7 PM)
- **Off-Peak Hours**: Low consumption periods (midnight - 6 AM, 10 PM - 11 PM)
- **Load Factor**: How efficiently you use energy (higher = more consistent)
- **Consumption Distribution**: Breakdown of usage levels (0-1 kWh, 1-5 kWh, etc.)

### 3. **Solar System Recommendations**

Based on your consumption, the system calculates:

- **Required Solar Panel Capacity** (in kW)
- **Number of Solar Panels** needed (default: 415W panels, configurable 250-700W)
- **Battery Storage Size** (for backup power, configurable autonomy days)
- **Inverter Size** (to handle peak loads)
- **Estimated Costs** (equipment + installation)
- **Expected Savings** and payback period

> **v2.0 Update:** All parameters are now configurable! See the PV Configuration Panel in the app for customization options based on [E.ON Romania data](https://www.eon-energie.ro/ro/pentru-acasa/articole-utile/consum-energetic/articole-legate-de-consum/cate-panouri-fotovoltaice-sunt-necesare-unei-case-din-romania.html).

---

## Key Formulas Explained (in Plain English)

### Solar Panel Sizing

**How many solar panels do you need?**

```
Step 1: Calculate your daily energy need
        → Average all your daily consumption values

Step 2: Calculate required solar capacity
        → Daily need ÷ 4.5 hours of sunlight ÷ 85% efficiency
        → This accounts for losses in the system

Step 3: Calculate number of panels
        → Required capacity ÷ 400 watts per panel
        → Round up to whole number
```

**Example:**
- Daily consumption: 30 kWh
- Required capacity: 30 ÷ 4.5 ÷ 0.85 = 7.84 kW
- Number of panels: 7,840 watts ÷ 400 watts = **20 panels**

### Battery Storage Sizing

**How much battery capacity do you need?**

```
Battery size = (Daily energy need × 2 days backup) ÷ 90% efficiency

The "2 days" provides reserve power for cloudy weather
The 90% accounts for charging/discharging losses
```

**Example:**
- Daily consumption: 30 kWh
- Battery size: (30 × 2) ÷ 0.9 = **66.7 kWh**

### Inverter Sizing

**What size inverter do you need?**

```
Inverter size = Peak power consumption × 1.2

The 1.2 factor (20% extra) handles surge loads
(like when multiple appliances start at once)
```

**Example:**
- Peak consumption: 5 kW
- Inverter size: 5 × 1.2 = **6 kW**

### Cost Calculations

**How much will the system cost?**

```
Equipment Costs (using configurable parameters):
- Solar panels: Number of panels × Panel Wattage × Price per Watt
  (Default: 415W panels @ configurable RON/watt)
- Battery: Capacity in kWh × Battery Cost per kWh (configurable)
- Inverter: Size in kW × Inverter Cost per kW (configurable)

Total Cost = Equipment Cost × Installation Multiplier (default: 1.3)
(The 1.3 adds 30% for installation, wiring, mounting, etc.)
```

**Example System Cost (using default 415W panels):**
- 19 panels: 19 × 415W = 7,885W capacity
- Battery and inverter: sized according to configurable parameters
- **Total calculated based on current market rates**

> **Note:** Exact costs depend on your configured parameters. Use the PV Configuration Panel to adjust prices based on your local market.

### Payback Period

**How long until the system pays for itself?**

```
Annual savings = Daily consumption × 365 days × Electricity Rate (RON/kWh)
Payback period = Total system cost ÷ Annual savings

Default: 0.80 RON/kWh (configurable range: 0.40-1.50 RON/kWh)
```

**Example (using default 0.80 RON/kWh):**
- Daily usage: 30 kWh
- Annual savings: 30 × 365 × 0.80 = 8,760 RON/year
- Payback: Total system cost ÷ 8,760 RON = **Payback period (years)**

> **Tip:** Adjust the electricity rate in the configuration panel to match your actual utility costs for accurate payback calculations.

---

## Three System Options

The application recommends three different system sizes:

### 🔵 Conservative System (80% Coverage)

- **Goal**: Cover 80% of energy needs
- **Cost**: Lowest (75% of optimal)
- **Best for**: Budget-conscious, reliable grid available
- **Trade-off**: Still need grid power regularly

### 🟢 Optimal System (100% Coverage)

- **Goal**: Cover 100% of average energy needs
- **Cost**: Moderate (baseline)
- **Best for**: Maximum self-sufficiency, typical residential
- **Trade-off**: Balanced approach

### 🟠 Aggressive System (130% Coverage)

- **Goal**: Oversized for future needs
- **Cost**: Highest (140% of optimal)
- **Best for**: Future EV charging, system expansion, off-grid
- **Trade-off**: Higher upfront cost

---

## Understanding Your Analysis Results

### Load Factor

**What it means:**
- **High (>70%)**: You use energy consistently throughout the day (efficient)
- **Medium (40-70%)**: Normal residential pattern with some peaks
- **Low (<40%)**: High variability, significant peak demands

**Why it matters:**
A higher load factor means your solar system will be used more efficiently.

### Peak-to-Off-Peak Ratio

**What it means:**
- **High (>5)**: Most usage during daytime (ideal for solar!)
- **Medium (2-5)**: Normal residential pattern
- **Low (<2)**: Heavy evening/night usage (need larger battery)

**Why it matters:**
Higher ratios mean solar panels will directly meet most of your demand.

### Coefficient of Variation

**What it means:**
- **High (>100%)**: Very unpredictable usage
- **Medium (50-100%)**: Moderate variability
- **Low (<50%)**: Consistent, predictable usage

**Why it matters:**
Lower variation allows for more precise system sizing and better efficiency.

---

## Important Parameters (v2.0 - All Configurable!)

> **Note:** Version 2.0 introduces full parametrization! All values below are **defaults** and can be customized in the PV Configuration Panel.

The calculations are based on these configurable parameters:

| Parameter | Default Value | Configurable Range | Data Source |
|-----------|---------------|-------------------|-------------|
| **System Efficiency** | 85% | 70% - 95% | Industry standard |
| **Peak Sun Hours** | 4.5 hours/day | 3.0 - 6.0 hours | Location dependent |
| **Panel Size** | 415 watts | 250 - 700 watts | E.ON Romania standard |
| **Battery Type** | Lithium-ion | - | 90% efficient (80-98% configurable) |
| **Battery Cycles** | 5000 cycles | 3000 - 10000 | Technology dependent |
| **Electricity Rate** | 0.80 RON/kWh | 0.40 - 1.50 RON/kWh | Romania market rate |
| **System Lifetime** | 25 years | - | Standard warranty |
| **Autonomy** | 2 days | 1 - 5 days | Backup requirements |

**Source:** Defaults based on [E.ON Romania - "Câte panouri fotovoltaice sunt necesare unei case din România?"](https://www.eon-energie.ro/ro/pentru-acasa/articole-utile/consum-energetic/articole-legate-de-consum/cate-panouri-fotovoltaice-sunt-necesare-unei-case-din-romania.html)

---

## What's NOT Included

This analysis provides **preliminary estimates** only. For actual installation, you'll need:

- ✋ Site survey (roof condition, shading, orientation)
- ✋ Local solar irradiation data (actual sunlight in your area)
- ✋ Building code compliance review
- ✋ Grid connection approval
- ✋ Structural engineering (roof load capacity)
- ✋ Detailed electrical design
- ✋ Local incentives and subsidies investigation
- ✋ Permits and regulatory approvals

**⚠️ Always consult with certified solar installers before making investment decisions.**

---

## Data Privacy & Transparency

### What data is processed?
- Only the energy consumption data you upload
- No personal information is collected
- All processing happens in your browser

### Transparency Commitment
- All formulas are documented (see TECHNICAL_ANALYSIS_FORMULAS.md)
- Calculations follow industry standards (IEEE, IEC)
- No hidden assumptions or "black box" calculations

---

## How to Use the Application

1. **Prepare Your Data**: Excel file with columns: energie (kwh), ora, zi, luna
2. **Upload**: Drag and drop or select your file
3. **Review Analysis**: Check consumption patterns and statistics
4. **Compare Options**: Review the 3 system sizing recommendations
5. **Download Results**: Save reports for contractors/installers

---

## Questions & Answers

### Q: What panel sizes can I use?
**A (v2.0):** The system now supports configurable panel sizes from 250W to 700W. The default is 415W based on [E.ON Romania data](https://www.eon-energie.ro/ro/pentru-acasa/articole-utile/consum-energetic/articole-legate-de-consum/cate-panouri-fotovoltaice-sunt-necesare-unei-case-din-romania.html), but you can adjust this in the PV Configuration Panel to match your specific panels.

### Q: Why 4.5 peak sun hours?
**A:** This is a conservative average for Romania and Europe. The value is configurable (range: 3.0-6.0 hours) to match your specific location's solar irradiation data.

### Q: Can I customize all the parameters?
**A:** Yes! Version 2.0 introduces a complete parametrization system with 16 configurable parameters including panel wattage, efficiency, battery specs, costs, and more. See the PV Configuration Panel in the app or read PV_PARAMETRIZATION_GUIDE.md for details.

### Q: What about government incentives?
**A:** These vary by country/region and are not included. Check local programs for rebates or tax credits.

### Q: How accurate are the cost estimates?
**A:** ±20% accuracy. Costs vary by supplier, location, and installation complexity. Get multiple quotes.

### Q: What about maintenance costs?
**A:** Budget ~1-2% of system cost annually for cleaning, monitoring, and minor repairs.

---

## Next Steps

After reviewing your analysis:

1. ✅ Save/print the analysis results
2. ✅ Contact 3-5 local solar installers for quotes
3. ✅ Share this technical documentation with installers
4. ✅ Request site surveys and detailed proposals
5. ✅ Compare proposals against these baseline calculations
6. ✅ Check local incentives and financing options
7. ✅ Verify installer certifications and warranties

---

## Technical Support

For detailed technical documentation, see:
- **TECHNICAL_ANALYSIS_FORMULAS.md** - Complete formulas and methodologies
- **DATA_READING_IMPROVEMENTS.md** - Data processing details

---

## Disclaimer

This tool provides **educational estimates** for planning purposes. It does not replace professional engineering analysis or site-specific design. All investment decisions should be made in consultation with qualified solar energy professionals and financial advisors.

The calculations are based on industry standards and typical market conditions as of October 2025. Actual results may vary based on:
- Local weather patterns and solar irradiation
- Specific equipment selection and pricing
- Installation complexity and labor costs
- Local regulations and grid requirements
- Future changes in energy consumption patterns

---

**Application Version:** 1.0  
**Last Updated:** October 20, 2025  
**Access Link:** https://ubiquitous-orbit-wvp4rxqq66wfgw5q-3001.app.github.dev/

---

*For feedback or questions about this documentation, please contact your project representative.*
