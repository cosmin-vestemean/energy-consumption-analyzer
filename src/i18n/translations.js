export const translations = {
  ro: {
    // Header
    appTitle: "Analizator Consum Energetic",
    appSubtitle: "Încărcați datele de consum și obțineți informații detaliate",
    helpButton: "Ajutor",
    
    // File Upload
    uploadTitle: "Încărcați Datele de Consum",
    uploadDescription: "Trageți și plasați fișierul CSV aici sau faceți clic pentru a selecta",
    uploadButton: "Selectați Fișier",
    uploadInfo: "Format acceptat: CSV (consum.csv)",
    sampleDataTitle: "Format Exemplu de Date",
    
    // Price Configuration
    priceTitle: "Configurare Preț Energie",
    priceLabel: "Preț energie (RON/kWh)",
    priceDisplay: "Preț energie",
    priceInfoTitle: "Informații despre configurarea prețului:",
    priceInfoDesc: "Folosim acest preț pentru a calcula:",
    priceInfo1: "Costuri totale și lunare de consum",
    priceInfo2: "Economii potențiale cu sisteme fotovoltaice",
    priceInfo3: "Perioadă de recuperare a investiției",
    priceInfo4: "Beneficii financiare pe termen lung",
    priceInfoNote: "Puteți schimba acest preț oricând pentru a vedea scenarii diferite.",
    changePrice: "Schimbă Prețul",
    
    // Dashboard
    dashboardTitle: "Tablou de Bord Consum Energetic",
    dataCoverage: "Acoperire Date",
    readings: "citiri",
    days: "zile",
    months: "luni",
    fullYear: "din an complet",
    period: "Perioadă",
    dataPoints: "puncte de date",
    
    // Stats Cards
    totalConsumption: "Consum Total",
    averageHourly: "Medie Orară",
    peakConsumption: "Consum Vârf",
    dailyAverage: "Medie Zilnică",
    perHour: "Pe oră",
    maximumRecorded: "Maxim înregistrat",
    perDay: "Pe zi",
    
    // Charts
    hourlyPattern: "Profil Consum Orar",
    dailyConsumption: "Consum Zilnic",
    peakHours: "Ore de Vârf (Top 5)",
    hourlyDistribution: "Distribuție Orară",
    average: "Medie",
    maximum: "Maxim",
    minimum: "Minim",
    total: "Total",
    hour: "Oră",
    
    // Consumption Analysis
    analysisTitle: "Analiză Detaliată Consum",
    detailedConsumptionAnalysis: "Analiză Detaliată Consum",
    basicStats: "Statistici de Bază",
    consumptionPatterns: "Modele de Consum",
    peakConsumptionHours: "Ore de Consum Maxim",
    costs: "Costuri",
    totalEnergy: "Energie totală",
    averageConsumption: "Consum mediu",
    peakValue: "Valoare maximă",
    lowestValue: "Valoare minimă",
    standardDeviation: "Deviație standard",
    dailyAverageConsumption: "Consum mediu zilnic",
    estimatedMonthlyCost: "Cost lunar estimat",
    estimatedYearlyCost: "Cost anual estimat",
    
    // Peak vs Off-Peak Analysis
    peakVsOffPeakAnalysis: "Analiză Vârf vs Non-Vârf",
    peakHoursAvg: "Medie Ore Vârf:",
    offPeakAvg: "Medie Non-Vârf:",
    peakOffPeakRatio: "Raport Vârf/Non-Vârf:",
    
    // Load Characteristics
    loadCharacteristics: "Caracteristici Sarcină",
    loadFactor: "Factor Sarcină:",
    variabilityCV: "Variabilitate (CV):",
    stdDeviation: "Dev. Standard:",
    
    // Peak Hours
    peakHoursIdentification: "Identificare Ore Vârf",
    
    // Charts - Additional
    consumptionDistribution: "Distribuție Consum",
    consumptionTimeSeries: "Serie Temporală Consum",
    consumptionVsHourScatter: "Grafic Consum vs Oră",
    
    // Key Insights
    keyInsights: "Observații Cheie",
    loadPattern: "Model Sarcină:",
    lowLoadFactorSuggests: "Factor sarcină redus sugerează variabilitate ridicată și modele de utilizare la vârf.",
    peakDemand: "Cerere Vârf:",
    peakConsumptionOccurs: "Consum maxim de {value} kWh apare la ora {hour}:00. Aceasta reprezintă capacitatea minimă necesară a sistemului.",
    variability: "Variabilitate:",
    veryHighVariability: "Variabilitate foarte ridicată necesită proiectare robustă a sistemului.",
    
    // PV System Additional
    dailyEnergyNeed: "Necesitate Energie Zilnică",
    conservativeSystem: "Sistem Conservator",
    costBreakdown: "Detaliere Costuri",
    systemComparison: "Comparație Sisteme",
    technicalSpecifications: "Specificații Tehnice (Sistem Optim)",
    calculationParameters: "Parametri Calcul",
    engineeringRecommendations: "Recomandări Inginerie",
    pvSystemConfig: "Configurare Parametri Sistem Fotovoltaic",
    
    // PV Configuration
    pvConfigTitle: "Configurare Sistem Fotovoltaic",
    toggleAdvanced: "Configurare Avansată",
    hideAdvanced: "Ascunde Configurarea Avansată",
    
    // PV Config Sections
    panelConfig: "Configurare Panouri",
    panelPower: "Putere panou (W)",
    panelPowerHelp: "Putere nominală per panou (tipic 300-550W)",
    panelEfficiency: "Eficiență panou (%)",
    panelEfficiencyHelp: "Eficiență de conversie (tipic 15-22%)",
    degradationRate: "Rată degradare (%/an)",
    degradationRateHelp: "Pierdere anuală eficiență (tipic 0.5-0.8%)",
    
    locationConfig: "Configurare Locație",
    latitude: "Latitudine",
    latitudeHelp: "Latitudine locație (-90 la 90)",
    solarIrradiance: "Iradiere solară (kWh/m²/zi)",
    solarIrradianceHelp: "Iradiere medie zilnică (2-6 pentru România)",
    installationType: "Tip instalație",
    installationTypeHelp: "Tip montaj sistem",
    rooftop: "Acoperiș",
    ground: "La sol",
    
    systemConfig: "Configurare Sistem",
    inverterEfficiency: "Eficiență invertor (%)",
    inverterEfficiencyHelp: "Eficiență conversie DC->AC (tipic 95-98%)",
    systemLosses: "Pierderi sistem (%)",
    systemLossesHelp: "Alte pierderi (cabluri, temperatură, umbră)",
    batteryCapacity: "Capacitate baterie (kWh)",
    batteryCapacityHelp: "0 pentru sistem fără baterie",
    batteryEfficiency: "Eficiență baterie (%)",
    batteryEfficiencyHelp: "Eficiență stocare și descărcare",
    
    financialConfig: "Configurare Financiară",
    systemCostPerKW: "Cost sistem (RON/kW)",
    systemCostPerKWHelp: "Cost total per kW instalat",
    maintenanceCost: "Cost întreținere (RON/an)",
    maintenanceCostHelp: "Cost anual întreținere",
    feedInTariff: "Tarif alimentare rețea (RON/kWh)",
    feedInTariffHelp: "Preț vânzare surplus către rețea",
    analysisYears: "Ani analiză",
    analysisYearsHelp: "Perioada de analiză financiară",
    
    usageConfig: "Configurare Utilizare",
    selfConsumption: "Autoconsum (%)",
    selfConsumptionHelp: "Procent energie folosită direct (30-70%)",
    
    // PV Recommendations
    pvRecommendationsTitle: "Recomandări Sistem Fotovoltaic",
    estimatedProduction: "Producție Estimată",
    annualProduction: "Producție anuală",
    coveragePercentage: "Procent acoperire",
    excessEnergy: "Energie excedentară",
    canBeSold: "poate fi vândută",
    annualSavings: "Economii Anuale",
    fromSelfConsumption: "din autoconsum",
    fromFeedIn: "din alimentare rețea",
    totalSavings: "Economii totale",
    
    investmentAnalysis: "Analiză Investiție",
    systemSize: "Dimensiune sistem",
    panels: "panouri",
    totalCost: "Cost total",
    paybackPeriod: "Perioadă recuperare",
    years: "ani",
    roi25Years: "ROI (25 ani)",
    
    systemOptions: "Opțiuni Sistem Recomandate",
    conservativeApproach: "Abordare Conservatoare",
    optimalBalance: "Echilibru Optim",
    aggressiveApproach: "Abordare Agresivă",
    recommendedSystem: "RECOMANDAT",
    targetCoverage: "Acoperire țintă",
    ofConsumption: "din consum",
    estimatedPanels: "Panouri estimate",
    totalCapacity: "Capacitate totală",
    yearlyProduction: "Producție anuală",
    estimatedCost: "Cost estimat",
    expectedPayback: "Recuperare așteptată",
    expectedROI: "ROI așteptat",
    
    detailedProjections: "Proiecții Detaliate pe 25 de Ani",
    year: "An",
    production: "Producție (kWh)",
    savings: "Economii (RON)",
    cumulativeSavings: "Economii Cumulative (RON)",
    
    productionChart: "Grafic Producție Anuală (cu Degradare)",
    savingsChart: "Grafic Economii Cumulative",
    
    monthlyBreakdown: "Defalcare Lunară",
    month: "Lună",
    monthlyProduction: "Producție Lunară (kWh)",
    monthlyValue: "Valoare Lunară (RON)",
    
    // Buttons
    resetButton: "Resetare - Încărcați Date Noi",
    
    // Months
    january: "Ianuarie",
    february: "Februarie",
    march: "Martie",
    april: "Aprilie",
    may: "Mai",
    june: "Iunie",
    july: "Iulie",
    august: "August",
    september: "Septembrie",
    october: "Octombrie",
    november: "Noiembrie",
    december: "Decembrie"
  },
  
  en: {
    // Header
    appTitle: "Energy Consumption Analyzer",
    appSubtitle: "Upload your consumption data and get detailed insights",
    helpButton: "Help",
    
    // File Upload
    uploadTitle: "Upload Consumption Data",
    uploadDescription: "Drag and drop your CSV file here or click to select",
    uploadButton: "Select File",
    uploadInfo: "Accepted format: CSV (consum.csv)",
    sampleDataTitle: "Sample Data Format",
    
    // Price Configuration
    priceTitle: "Energy Price Configuration",
    priceLabel: "Energy price (RON/kWh)",
    priceDisplay: "Energy price",
    priceInfoTitle: "Information about price configuration:",
    priceInfoDesc: "We use this price to calculate:",
    priceInfo1: "Total and monthly consumption costs",
    priceInfo2: "Potential savings with photovoltaic systems",
    priceInfo3: "Investment payback period",
    priceInfo4: "Long-term financial benefits",
    priceInfoNote: "You can change this price anytime to see different scenarios.",
    changePrice: "Change Price",
    
    // Dashboard
    dashboardTitle: "Energy Consumption Dashboard",
    dataCoverage: "Data Coverage",
    readings: "readings",
    days: "days",
    months: "months",
    fullYear: "of full year",
    period: "Period",
    dataPoints: "data points",
    
    // Stats Cards
    totalConsumption: "Total Consumption",
    averageHourly: "Average Hourly",
    peakConsumption: "Peak Consumption",
    dailyAverage: "Daily Average",
    perHour: "Per hour",
    maximumRecorded: "Maximum recorded",
    perDay: "Per day",
    
    // Charts
    hourlyPattern: "Hourly Consumption Pattern",
    dailyConsumption: "Daily Consumption",
    peakHours: "Peak Hours (Top 5)",
    hourlyDistribution: "Hourly Distribution",
    average: "Average",
    maximum: "Maximum",
    minimum: "Minimum",
    total: "Total",
    hour: "Hour",
    
    // Consumption Analysis
    analysisTitle: "Detailed Consumption Analysis",
    detailedConsumptionAnalysis: "Detailed Consumption Analysis",
    basicStats: "Basic Statistics",
    consumptionPatterns: "Consumption Patterns",
    peakConsumptionHours: "Peak Consumption Hours",
    costs: "Costs",
    totalEnergy: "Total energy",
    averageConsumption: "Average consumption",
    peakValue: "Peak value",
    lowestValue: "Lowest value",
    standardDeviation: "Standard deviation",
    dailyAverageConsumption: "Daily average consumption",
    estimatedMonthlyCost: "Estimated monthly cost",
    estimatedYearlyCost: "Estimated yearly cost",
    
    // Peak vs Off-Peak Analysis
    peakVsOffPeakAnalysis: "Peak vs Off-Peak Analysis",
    peakHoursAvg: "Peak Hours Avg:",
    offPeakAvg: "Off-Peak Avg:",
    peakOffPeakRatio: "Peak/Off-Peak Ratio:",
    
    // Load Characteristics
    loadCharacteristics: "Load Characteristics",
    loadFactor: "Load Factor:",
    variabilityCV: "Variability (CV):",
    stdDeviation: "Std Deviation:",
    
    // Peak Hours
    peakHoursIdentification: "Peak Hours Identification",
    
    // Charts - Additional
    consumptionDistribution: "Consumption Distribution",
    consumptionTimeSeries: "Consumption Time Series",
    consumptionVsHourScatter: "Consumption vs Hour Scatter Plot",
    
    // Key Insights
    keyInsights: "Key Insights",
    loadPattern: "Load Pattern:",
    lowLoadFactorSuggests: "Low load factor suggests high variability and peak usage patterns.",
    peakDemand: "Peak Demand:",
    peakConsumptionOccurs: "Peak consumption of {value} kWh occurs during hour {hour}:00. This represents the minimum system capacity needed.",
    variability: "Variability:",
    veryHighVariability: "Very high consumption variability requires robust system design.",
    
    // PV System Additional
    dailyEnergyNeed: "Daily Energy Need",
    conservativeSystem: "Conservative System",
    costBreakdown: "Cost Breakdown",
    systemComparison: "System Comparison",
    technicalSpecifications: "Technical Specifications (Optimal System)",
    calculationParameters: "Calculation Parameters",
    engineeringRecommendations: "Engineering Recommendations",
    pvSystemConfig: "Photovoltaic System Parameters Configuration",
    
    // PV Configuration
    pvConfigTitle: "Photovoltaic System Configuration",
    toggleAdvanced: "Advanced Configuration",
    hideAdvanced: "Hide Advanced Configuration",
    
    // PV Config Sections
    panelConfig: "Panel Configuration",
    panelPower: "Panel power (W)",
    panelPowerHelp: "Nominal power per panel (typically 300-550W)",
    panelEfficiency: "Panel efficiency (%)",
    panelEfficiencyHelp: "Conversion efficiency (typically 15-22%)",
    degradationRate: "Degradation rate (%/year)",
    degradationRateHelp: "Annual efficiency loss (typically 0.5-0.8%)",
    
    locationConfig: "Location Configuration",
    latitude: "Latitude",
    latitudeHelp: "Location latitude (-90 to 90)",
    solarIrradiance: "Solar irradiance (kWh/m²/day)",
    solarIrradianceHelp: "Average daily irradiance (2-6 for Romania)",
    installationType: "Installation type",
    installationTypeHelp: "System mounting type",
    rooftop: "Rooftop",
    ground: "Ground",
    
    systemConfig: "System Configuration",
    inverterEfficiency: "Inverter efficiency (%)",
    inverterEfficiencyHelp: "DC->AC conversion efficiency (typically 95-98%)",
    systemLosses: "System losses (%)",
    systemLossesHelp: "Other losses (cables, temperature, shade)",
    batteryCapacity: "Battery capacity (kWh)",
    batteryCapacityHelp: "0 for system without battery",
    batteryEfficiency: "Battery efficiency (%)",
    batteryEfficiencyHelp: "Storage and discharge efficiency",
    
    financialConfig: "Financial Configuration",
    systemCostPerKW: "System cost (RON/kW)",
    systemCostPerKWHelp: "Total cost per kW installed",
    maintenanceCost: "Maintenance cost (RON/year)",
    maintenanceCostHelp: "Annual maintenance cost",
    feedInTariff: "Feed-in tariff (RON/kWh)",
    feedInTariffHelp: "Price for selling surplus to grid",
    analysisYears: "Analysis years",
    analysisYearsHelp: "Financial analysis period",
    
    usageConfig: "Usage Configuration",
    selfConsumption: "Self-consumption (%)",
    selfConsumptionHelp: "Percentage of energy used directly (30-70%)",
    
    // PV Recommendations
    pvRecommendationsTitle: "Photovoltaic System Recommendations",
    estimatedProduction: "Estimated Production",
    annualProduction: "Annual production",
    coveragePercentage: "Coverage percentage",
    excessEnergy: "Excess energy",
    canBeSold: "can be sold",
    annualSavings: "Annual Savings",
    fromSelfConsumption: "from self-consumption",
    fromFeedIn: "from feed-in",
    totalSavings: "Total savings",
    
    investmentAnalysis: "Investment Analysis",
    systemSize: "System size",
    panels: "panels",
    totalCost: "Total cost",
    paybackPeriod: "Payback period",
    years: "years",
    roi25Years: "ROI (25 years)",
    
    systemOptions: "Recommended System Options",
    conservativeApproach: "Conservative Approach",
    optimalBalance: "Optimal Balance",
    aggressiveApproach: "Aggressive Approach",
    recommendedSystem: "RECOMMENDED",
    targetCoverage: "Target coverage",
    ofConsumption: "of consumption",
    estimatedPanels: "Estimated panels",
    totalCapacity: "Total capacity",
    yearlyProduction: "Yearly production",
    estimatedCost: "Estimated cost",
    expectedPayback: "Expected payback",
    expectedROI: "Expected ROI",
    
    detailedProjections: "Detailed 25-Year Projections",
    year: "Year",
    production: "Production (kWh)",
    savings: "Savings (RON)",
    cumulativeSavings: "Cumulative Savings (RON)",
    
    productionChart: "Annual Production Chart (with Degradation)",
    savingsChart: "Cumulative Savings Chart",
    
    monthlyBreakdown: "Monthly Breakdown",
    month: "Month",
    monthlyProduction: "Monthly Production (kWh)",
    monthlyValue: "Monthly Value (RON)",
    
    // Buttons
    resetButton: "Reset - Upload New Data",
    
    // Months
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December"
  },
  
  fr: {
    // Header
    appTitle: "Analyseur de Consommation Énergétique",
    appSubtitle: "Téléchargez vos données de consommation et obtenez des informations détaillées",
    helpButton: "Aide",
    
    // File Upload
    uploadTitle: "Télécharger les Données de Consommation",
    uploadDescription: "Glissez et déposez votre fichier CSV ici ou cliquez pour sélectionner",
    uploadButton: "Sélectionner un Fichier",
    uploadInfo: "Format accepté : CSV (consum.csv)",
    sampleDataTitle: "Format d'Exemple de Données",
    
    // Price Configuration
    priceTitle: "Configuration du Prix de l'Énergie",
    priceLabel: "Prix de l'énergie (RON/kWh)",
    priceDisplay: "Prix de l'énergie",
    priceInfoTitle: "Informations sur la configuration du prix :",
    priceInfoDesc: "Nous utilisons ce prix pour calculer :",
    priceInfo1: "Coûts totaux et mensuels de consommation",
    priceInfo2: "Économies potentielles avec des systèmes photovoltaïques",
    priceInfo3: "Période de récupération de l'investissement",
    priceInfo4: "Avantages financiers à long terme",
    priceInfoNote: "Vous pouvez modifier ce prix à tout moment pour voir différents scénarios.",
    changePrice: "Changer le Prix",
    
    // Dashboard
    dashboardTitle: "Tableau de Bord de Consommation Énergétique",
    dataCoverage: "Couverture des Données",
    readings: "lectures",
    days: "jours",
    months: "mois",
    fullYear: "de l'année complète",
    period: "Période",
    dataPoints: "points de données",
    
    // Stats Cards
    totalConsumption: "Consommation Totale",
    averageHourly: "Moyenne Horaire",
    peakConsumption: "Consommation de Pointe",
    dailyAverage: "Moyenne Quotidienne",
    perHour: "Par heure",
    maximumRecorded: "Maximum enregistré",
    perDay: "Par jour",
    
    // Charts
    hourlyPattern: "Profil de Consommation Horaire",
    dailyConsumption: "Consommation Quotidienne",
    peakHours: "Heures de Pointe (Top 5)",
    hourlyDistribution: "Distribution Horaire",
    average: "Moyenne",
    maximum: "Maximum",
    minimum: "Minimum",
    total: "Total",
    hour: "Heure",
    
    // Consumption Analysis
    analysisTitle: "Analyse Détaillée de la Consommation",
    detailedConsumptionAnalysis: "Analyse Détaillée de la Consommation",
    basicStats: "Statistiques de Base",
    consumptionPatterns: "Modèles de Consommation",
    peakConsumptionHours: "Heures de Consommation Maximale",
    costs: "Coûts",
    totalEnergy: "Énergie totale",
    averageConsumption: "Consommation moyenne",
    peakValue: "Valeur maximale",
    lowestValue: "Valeur minimale",
    standardDeviation: "Écart type",
    dailyAverageConsumption: "Consommation moyenne quotidienne",
    estimatedMonthlyCost: "Coût mensuel estimé",
    estimatedYearlyCost: "Coût annuel estimé",
    
    // Peak vs Off-Peak Analysis
    peakVsOffPeakAnalysis: "Analyse Pointe vs Hors-Pointe",
    peakHoursAvg: "Moy. Heures Pointe :",
    offPeakAvg: "Moy. Hors-Pointe :",
    peakOffPeakRatio: "Rapport Pointe/Hors-Pointe :",
    
    // Load Characteristics
    loadCharacteristics: "Caractéristiques de Charge",
    loadFactor: "Facteur de Charge :",
    variabilityCV: "Variabilité (CV) :",
    stdDeviation: "Écart Type :",
    
    // Peak Hours
    peakHoursIdentification: "Identification des Heures de Pointe",
    
    // Charts - Additional
    consumptionDistribution: "Distribution de Consommation",
    consumptionTimeSeries: "Série Temporelle de Consommation",
    consumptionVsHourScatter: "Graphique Consommation vs Heure",
    
    // Key Insights
    keyInsights: "Informations Clés",
    loadPattern: "Modèle de Charge :",
    lowLoadFactorSuggests: "Un faible facteur de charge suggère une forte variabilité et des modèles d'utilisation de pointe.",
    peakDemand: "Demande de Pointe :",
    peakConsumptionOccurs: "La consommation de pointe de {value} kWh se produit à l'heure {hour}:00. Cela représente la capacité minimale du système nécessaire.",
    variability: "Variabilité :",
    veryHighVariability: "Une très forte variabilité de la consommation nécessite une conception de système robuste.",
    
    // PV System Additional
    dailyEnergyNeed: "Besoin Énergétique Quotidien",
    conservativeSystem: "Système Conservateur",
    costBreakdown: "Répartition des Coûts",
    systemComparison: "Comparaison des Systèmes",
    technicalSpecifications: "Spécifications Techniques (Système Optimal)",
    calculationParameters: "Paramètres de Calcul",
    engineeringRecommendations: "Recommandations d'Ingénierie",
    pvSystemConfig: "Configuration des Paramètres du Système Photovoltaïque",
    
    // PV Configuration
    pvConfigTitle: "Configuration du Système Photovoltaïque",
    toggleAdvanced: "Configuration Avancée",
    hideAdvanced: "Masquer la Configuration Avancée",
    
    // PV Config Sections
    panelConfig: "Configuration des Panneaux",
    panelPower: "Puissance du panneau (W)",
    panelPowerHelp: "Puissance nominale par panneau (généralement 300-550W)",
    panelEfficiency: "Efficacité du panneau (%)",
    panelEfficiencyHelp: "Efficacité de conversion (généralement 15-22%)",
    degradationRate: "Taux de dégradation (%/an)",
    degradationRateHelp: "Perte d'efficacité annuelle (généralement 0,5-0,8%)",
    
    locationConfig: "Configuration de l'Emplacement",
    latitude: "Latitude",
    latitudeHelp: "Latitude de l'emplacement (-90 à 90)",
    solarIrradiance: "Irradiance solaire (kWh/m²/jour)",
    solarIrradianceHelp: "Irradiance quotidienne moyenne (2-6 pour la Roumanie)",
    installationType: "Type d'installation",
    installationTypeHelp: "Type de montage du système",
    rooftop: "Toit",
    ground: "Sol",
    
    systemConfig: "Configuration du Système",
    inverterEfficiency: "Efficacité de l'onduleur (%)",
    inverterEfficiencyHelp: "Efficacité de conversion DC->AC (généralement 95-98%)",
    systemLosses: "Pertes du système (%)",
    systemLossesHelp: "Autres pertes (câbles, température, ombre)",
    batteryCapacity: "Capacité de la batterie (kWh)",
    batteryCapacityHelp: "0 pour un système sans batterie",
    batteryEfficiency: "Efficacité de la batterie (%)",
    batteryEfficiencyHelp: "Efficacité de stockage et de décharge",
    
    financialConfig: "Configuration Financière",
    systemCostPerKW: "Coût du système (RON/kW)",
    systemCostPerKWHelp: "Coût total par kW installé",
    maintenanceCost: "Coût de maintenance (RON/an)",
    maintenanceCostHelp: "Coût annuel de maintenance",
    feedInTariff: "Tarif d'injection (RON/kWh)",
    feedInTariffHelp: "Prix de vente du surplus au réseau",
    analysisYears: "Années d'analyse",
    analysisYearsHelp: "Période d'analyse financière",
    
    usageConfig: "Configuration d'Utilisation",
    selfConsumption: "Autoconsommation (%)",
    selfConsumptionHelp: "Pourcentage d'énergie utilisée directement (30-70%)",
    
    // PV Recommendations
    pvRecommendationsTitle: "Recommandations de Système Photovoltaïque",
    estimatedProduction: "Production Estimée",
    annualProduction: "Production annuelle",
    coveragePercentage: "Pourcentage de couverture",
    excessEnergy: "Énergie excédentaire",
    canBeSold: "peut être vendue",
    annualSavings: "Économies Annuelles",
    fromSelfConsumption: "de l'autoconsommation",
    fromFeedIn: "de l'injection réseau",
    totalSavings: "Économies totales",
    
    investmentAnalysis: "Analyse d'Investissement",
    systemSize: "Taille du système",
    panels: "panneaux",
    totalCost: "Coût total",
    paybackPeriod: "Période de récupération",
    years: "ans",
    roi25Years: "ROI (25 ans)",
    
    systemOptions: "Options de Système Recommandées",
    conservativeApproach: "Approche Conservative",
    optimalBalance: "Équilibre Optimal",
    aggressiveApproach: "Approche Agressive",
    recommendedSystem: "RECOMMANDÉ",
    targetCoverage: "Couverture cible",
    ofConsumption: "de consommation",
    estimatedPanels: "Panneaux estimés",
    totalCapacity: "Capacité totale",
    yearlyProduction: "Production annuelle",
    estimatedCost: "Coût estimé",
    expectedPayback: "Récupération attendue",
    expectedROI: "ROI attendu",
    
    detailedProjections: "Projections Détaillées sur 25 Ans",
    year: "Année",
    production: "Production (kWh)",
    savings: "Économies (RON)",
    cumulativeSavings: "Économies Cumulatives (RON)",
    
    productionChart: "Graphique de Production Annuelle (avec Dégradation)",
    savingsChart: "Graphique des Économies Cumulatives",
    
    monthlyBreakdown: "Répartition Mensuelle",
    month: "Mois",
    monthlyProduction: "Production Mensuelle (kWh)",
    monthlyValue: "Valeur Mensuelle (RON)",
    
    // Buttons
    resetButton: "Réinitialiser - Télécharger de Nouvelles Données",
    
    // Months
    january: "Janvier",
    february: "Février",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Août",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Décembre"
  }
};

export const getTranslation = (language, key) => {
  return translations[language]?.[key] || translations['en'][key] || key;
};
