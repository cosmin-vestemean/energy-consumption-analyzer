# Parametrizare Sistem Fotovoltaic - Ghid de Utilizare

## Prezentare Generală

Aplicația Energy Consumption Analyzer include acum un sistem complet parametrizabil pentru calcularea recomandărilor de sisteme fotovoltaice (PV). Toate valorile folosite în calcule pot fi personalizate prin interfața de configurare.

## Modificări Implementate

### 1. Fișier de Configurare Centralizat
**Locație**: `src/config/pvSystemConfig.js`

Acest fișier conține toate parametrii utilizați în calcule:

#### Parametri Panouri Solare
- **Putere panou**: 415W (interval E.ON: 250-550W)
- **Eficiență sistem**: 85%
- **Ore solare maxime/zi**: 4.5 ore (specific României)
- **Raport de producție**: 1.3 (interval E.ON: 1.3-1.6)
- **Cost panou**: ~3.98 RON/W
- **Suprafață panou**: 2 m²

#### Parametri Baterii
- **Autonomie**: 2 zile
- **Eficiență**: 90% (round-trip)
- **Cicli de viață**: 5,000+ cicli
- **Cost**: ~1,988 RON/kWh
- **Tehnologie**: Lithium-ion

#### Parametri Invertor
- **Marjă siguranță**: 20% (1.2× sarcina maximă)
- **Cost**: ~1,491 RON/kW
- **Tip**: Hybrid Grid-tie
- **Eficiență**: 97%

#### Parametri Financiari
- **Preț electricitate**: 0.80 RON/kWh (configurabil)
- **Cost instalare**: 30% din costul echipamentului
- **Curs EUR→RON**: 4.97
- **Garanție**: 25 ani

### 2. Componentă de Configurare (PVConfigPanel)
**Locație**: `src/components/PVConfigPanel.jsx`

Interfață intuitivă pentru modificarea tuturor parametrilor:

**Caracteristici**:
- ✅ Configurare expandabilă/colapsabilă
- ✅ Validare în timp real
- ✅ Avertismente pentru valori în afara intervalelor normale
- ✅ Tabel de referință cu date E.ON
- ✅ Butoane: Aplică, Resetare la valori implicite, Anulare

### 3. Componenta PVRecommendations Actualizată
**Locație**: `src/components/PVRecommendations.jsx`

**Modificări**:
- Folosește configurația parametrizabilă în loc de valori hardcodate
- Afișează parametrii folosiți în calcule
- Include suprafața totală necesară pe acoperiș
- Integrează panoul de configurare direct în interfață

## Date de Referință E.ON România

### Sisteme Standard și Producția Lor
Conform articolului E.ON (sursa inclusa în cod):

| Sistem (kW) | Panouri | Suprafață (m²) | Producție Anuală (kWh) |
|-------------|---------|----------------|------------------------|
| 3 kW        | 7 buc   | 15 m²         | 3,800 kWh             |
| 5 kW        | 12 buc  | 26 m²         | 6,300 kWh             |
| 6 kW        | 14 buc  | 30 m²         | 7,600 kWh             |
| 8 kW        | 18 buc  | 40 m²         | 10,200 kWh            |
| 10 kW       | 23 buc  | 50 m²         | 12,700 kWh            |
| 12 kW       | 27 buc  | 60 m²         | 15,300 kWh            |
| 15 kW       | 34 buc  | 75 m²         | 19,100 kWh            |
| 20 kW       | 45 buc  | 99 m²         | 25,500 kWh            |

### Factori Cheie pentru România
- **Consum mediu anual**: 2,500 kWh/an pentru o gospodărie
- **Raport de producție**: 1.3-1.6 (funcție de locația geografică)
- **Putere panou standard**: 415W (interval: 250-550W)
- **Orientare optimă**: Sud, înclinație 15-40°

## Cum să Utilizați Funcția de Parametrizare

### Pas 1: Deschideți Panoul de Configurare
1. Navigați la secțiunea "Photovoltaic System Recommendations"
2. Căutați panoul mov "⚙️ Configurare Parametri Sistem Fotovoltaic"
3. Click pe butonul "Afișează Configurare Avansată"

### Pas 2: Modificați Parametrii Doriți
Parametrii sunt organizați în 4 categorii:

#### ☀️ Panouri Solare
- Ajustați puterea panourilor (250-600W)
- Modificați eficiența sistemului
- Setați orele solare pentru regiunea dvs.
- Actualizați costurile curente de piață

#### 🔋 Stocare Baterii
- Configurați zilele de autonomie dorită
- Ajustați eficiența și prețul bateriilor
- Modificați numărul de cicli de viață

#### ⚡ Invertor
- Setați marja de siguranță dorită
- Actualizați costurile invertorului
- Ajustați eficiența

#### 💰 Parametri Financiari
- **Important**: Modificați prețul actual al electricității
- Actualizați cursul valutar
- Ajustați costurile de instalare

### Pas 3: Validați și Aplicați
- Sistemul validează automat valorile introduse
- Veți vedea avertismente dacă valorile sunt în afara intervalelor normale
- Click "✓ Aplică Configurația" pentru a recalcula recomandările
- Folosiți "↺ Resetare la Valori Implicite" pentru a reveni la setările E.ON

### Pas 4: Revizuiți Rezultatele
După aplicare, toate calculele se vor actualiza:
- Număr de panouri
- Capacitate baterie
- Costuri totale
- Perioada de recuperare
- Economii anuale

## Utilizare Programatică

### Import Configurație
```javascript
import { defaultPVConfig, validateConfig, mergeConfig } from '../config/pvSystemConfig';
```

### Validare Configurație Personalizată
```javascript
const myConfig = {
  solar: {
    panelWattage: 450,
    peakSunHours: 5.0
  }
};

const validation = validateConfig(myConfig);
if (!validation.isValid) {
  console.warn('Warnings:', validation.warnings);
}
```

### Combinare cu Valori Implicite
```javascript
const customConfig = mergeConfig({
  financial: {
    electricityPricePerKwh: 0.95
  }
});
```

## Cazuri de Utilizare

### 1. Actualizare Prețuri Piață
Când prețurile energiei sau echipamentelor se schimbă:
- Deschideți configurarea
- Modificați "Preț Electricitate" în secțiunea Financiară
- Actualizați costurile componentelor
- Aplicați pentru calcule actualizate

### 2. Regiuni cu Iradiere Diferită
Pentru zone cu mai mult/mai puțin soare:
- Ajustați "Ore Solare Maxime/Zi"
- Modificați "Raport de Producție" (1.3-1.6)
- Aplicați pentru estimări precise

### 3. Cerințe Speciale de Autonomie
Pentru locuințe cu cerințe specifice:
- Modificați "Zile Autonomie" în secțiunea Baterii
- Ajustați capacitatea și costurile
- Revizuiți impactul asupra investiției totale

### 4. Comparare Tehnologii
Pentru compararea diferitelor tipuri de echipamente:
- Salvați configurația curentă (screenshot/notițe)
- Modificați parametrii pentru tehnologia alternativă
- Comparați rezultatele

## Sfaturi pentru Configurare Optimă

### ✅ Recomandări
1. **Folosiți date locale**: Ajustați orele solare bazat pe regiunea din România
2. **Actualizați prețurile**: Verificați periodic costurile actuale de piață
3. **Consultați datele E.ON**: Tabelul de referință oferă benchmark-uri validate
4. **Supradimensionați**: Considerați creșteri viitoare de consum (mașină electrică, etc.)

### ⚠️ Atenționări
1. **Nu subestimați costurile de instalare**: 30% este un minim, poate fi mai mult
2. **Verificați garanțiile**: Asigurați-vă că parametrii corespund echipamentelor reale
3. **Considerați degradarea**: Panourile își pierd 0.5-1% eficiență/an
4. **Consultați un specialist**: Aceste calcule sunt estimări, nu înlocuiesc sfatul profesional

## Surse și Referințe

### Date Folosite din E.ON
- **Articol**: "Câte panouri fotovoltaice sunt necesare unei case din România?"
- **URL**: https://www.eon.ro/statie-energie/ghid-consum/cate-panouri-fotovoltaice-sunt-necesare-unei-case-din-romania
- **Date extrase**:
  - Putere panouri: 250-550W (standard 415W)
  - Raport producție: 1.3-1.6 pentru România
  - Consum mediu: 2,500 kWh/an
  - Tabel sisteme standard și producție

### Alte Surse
- Costuri piață: Bazate pe date din 2023-2024 (conversia EUR→RON)
- Eficiențe: Standarde industriei pentru echipamente moderne
- Parametri baterii: Specificații Lithium-ion standard

## Actualizări Viitoare Planificate

- [ ] Import/Export configurații (JSON)
- [ ] Preseturi pentru regiuni din România
- [ ] Calcul degradare panouri în timp
- [ ] Integrare cu API-uri pentru prețuri actuale energie
- [ ] Comparare side-by-side a mai multor configurații
- [ ] Grafice pentru sensibilitate la parametri
- [ ] Export rapoarte PDF personalizate

## Suport

Pentru întrebări sau sugestii despre funcționalitatea de parametrizare:
1. Verificați documentația E.ON (link în aplicație)
2. Consultați tabelul de referință pentru valori standard
3. Contactați un instalator autorizat ANRE pentru sfaturi personalizate

---

**Versiune**: 2.0  
**Data actualizare**: Octombrie 2025  
**Autor**: Energy Consumption Analyzer Team
