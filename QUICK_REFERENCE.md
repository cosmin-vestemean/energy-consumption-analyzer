# Quick Reference - Analysis & Formulas

**Electric Consumption Analyzer** | Version 1.0 | October 2025

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
Required Capacity (kW) = Daily kWh ÷ 4.5 hours ÷ 0.85 efficiency

Number of Panels = Capacity × 1000 ÷ 400 watts per panel (round up)
```

**Example:** 30 kWh/day → 7.84 kW → **20 panels**

### Battery Storage

```
Battery (kWh) = Daily kWh × 2 days ÷ 0.9 efficiency
```

**Example:** 30 kWh/day → **66.7 kWh battery**

### Inverter

```
Inverter (kW) = Peak consumption × 1.2 safety margin
```

**Example:** 5 kW peak → **6 kW inverter**

---

## 💰 Cost Estimation

| Component | Price Formula |
|-----------|---------------|
| **Solar Panels** | Panels × 400W × €0.80/watt |
| **Battery** | Capacity (kWh) × €400/kWh |
| **Inverter** | Size (kW) × €300/kW |
| **TOTAL** | Equipment × 1.3 (includes installation) |

---

## 📈 Return on Investment

```
Annual Savings = Daily kWh × 365 × €0.25/kWh

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

## ⚙️ Key Assumptions

- **System Efficiency:** 85%
- **Peak Sun Hours:** 4.5 hours/day
- **Panel Size:** 400 watts
- **Battery:** Lithium-ion, 90% efficient
- **Electricity Rate:** €0.25/kWh
- **Autonomy:** 2 days backup

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
