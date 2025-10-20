# Quick Reference - Analysis & Formulas

**Electric Consumption Analyzer** | Version 2.0 ⚙️ PARAMETRIZABLE | October 2025

> **NEW in v2.0:** All calculation parameters are now fully configurable! Values below show defaults based on E.ON Romania data. See [PV_PARAMETRIZATION_GUIDE.md](PV_PARAMETRIZATION_GUIDE.md) for customization.

---

## 📊 What Gets Analyzed

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| **Total Consumption** | Sum of all readings | Total energy used in period |
| **Average Hourly** | Total ÷ Number of readings | Typical hourly usage |
| **Average Daily** | Sum of daily totals ÷ Days | Typical daily usage |
| **Peak Consumption** | Maximum reading | Highest power demand |
| **Load Factor** | (Average ÷ Peak) × 100% | Usage consistency (higher = better) |

---

## ☀️ Solar System Sizing

### Solar Panels

```
Required Capacity (kW) = Daily kWh ÷ Peak Sun Hours ÷ System Efficiency
Default: Daily kWh ÷ 4.5 hours ÷ 0.85 [configurable: 3.0-7.0h, 70-95%]

Number of Panels = Capacity × 1000 ÷ Panel Wattage (round up)
Default: Capacity × 1000 ÷ 415 watts [E.ON standard, configurable: 250-600W]
```

**Example (default values):** 30 kWh/day → 7.84 kW → **19 panels @ 415W**
**Example (old 400W panels):** 30 kWh/day → 7.84 kW → **20 panels @ 400W**

### Battery Storage

```
Battery (kWh) = Daily kWh × Autonomy Days ÷ Battery Efficiency
Default: Daily kWh × 2 days ÷ 0.9 [configurable: 0.5-5 days, 70-98%]
```

**Example:** 30 kWh/day → **66.7 kWh battery**

### Inverter

```
Inverter (kW) = Peak consumption × Safety Margin
Default: Peak × 1.2 [configurable: 1.1-1.5 (10-50% margin)]
```

**Example:** 5 kW peak → **6 kW inverter**

---

## 💰 Cost Estimation

| Component | Price Formula | Notes |
|-----------|---------------|-------|
| **Solar Panels** | Panels × Wattage × Cost/W | Default: 415W × 3.98 RON/W [configurable] |
| **Battery** | Capacity (kWh) × Cost/kWh | Default: 1,988 RON/kWh [configurable] |
| **Inverter** | Size (kW) × Cost/kW | Default: 1,491 RON/kW [configurable] |
| **TOTAL** | Equipment × Multiplier | Default: × 1.3 (30% installation) [configurable: 20-50%] |

**Note:** Costs in RON (Romanian Leu). Previous versions used EUR. All costs are configurable in the application.

---

## 📈 Return on Investment

```
Annual Savings = Daily kWh × 365 × Electricity Rate

Default: Daily kWh × 365 × 0.80 RON/kWh [configurable: 0.50-2.00 RON/kWh]
Previous versions used €0.25/kWh (European average)

Payback Period = Total Cost ÷ Annual Savings
```

---

## 🎯 System Options

| Option | Coverage | Cost | Best For |
|--------|----------|------|----------|
| **Conservative** | 80% | 75% of optimal | Budget-conscious, reliable grid |
| **Optimal** | 100% | Baseline | Standard residential |
| **Aggressive** | 130% | 140% of optimal | Future expansion, off-grid |

---

## 🔍 Understanding Your Patterns

### Load Factor
- **>70%**: Consistent usage ✅ (efficient)
- **40-70%**: Normal residential pattern
- **<40%**: High peaks (need robust system)

### Peak-to-Off-Peak Ratio
- **>5**: Daytime heavy ✅ (ideal for solar!)
- **2-5**: Normal pattern
- **<2**: Evening/night heavy (need big battery)

### Variability (CV)
- **<50%**: Low variability ✅ (predictable)
- **50-100%**: Moderate (typical)
- **>100%**: High variability (need margins)

---

## ⚙️ Key Assumptions (Default Values - All Configurable!)

> **Version 2.0:** All parameters below are now configurable in the application. See [PV_PARAMETRIZATION_GUIDE.md](PV_PARAMETRIZATION_GUIDE.md) for customization options.

- **System Efficiency:** 85% [range: 70-95%]
- **Peak Sun Hours:** 4.5 hours/day [range: 3.0-7.0h, Romania average]
- **Panel Size:** 415 watts [range: 250-600W, E.ON standard]
- **Battery:** Lithium-ion, 90% efficient [range: 70-98%]
- **Electricity Rate:** 0.80 RON/kWh [range: 0.50-2.00, configurable]
- **Autonomy:** 2 days backup [range: 0.5-5 days]
- **Production Ratio:** 1.3 [range: 1.0-2.0, E.ON Romania: 1.3-1.6]
- **Installation Cost:** +30% [range: +20% to +50%]

**Data Source:** E.ON Romania validated values + industry standards

---

## ⚠️ Important Notes

✋ **These are estimates only**
- Always get professional site surveys
- Check local solar conditions
- Verify building codes & permits
- Compare multiple installer quotes
- Research local incentives

✅ **What's Transparent**
- All formulas documented
- Industry-standard calculations
- No hidden assumptions

---

## 📱 Application Access

**URL:** https://ubiquitous-orbit-wvp4rxqq66wfgw5q-3001.app.github.dev/

**Required Data:**
- Excel file with: energie (kwh), ora, zi, luna
- Hourly or daily readings
- Minimum 1 week, recommended 1 year

---

## 📚 Full Documentation

- **CLIENT_SUMMARY.md** → Detailed explanations
- **TECHNICAL_ANALYSIS_FORMULAS.md** → Complete formulas
- **DATA_READING_IMPROVEMENTS.md** → Data processing details

---

*Quick reference card for clients and contractors*
