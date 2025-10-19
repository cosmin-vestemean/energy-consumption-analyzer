# ⚡ Electric Consumption Analyzer

A comprehensive React application for analyzing electric consumption data and designing optimal photovoltaic (PV) systems for engineers and energy consultants.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.6-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Features

### �� **Comprehensive Energy Analysis**
- Interactive dashboards with real-time statistics
- Hourly consumption pattern analysis
- Daily and monthly consumption tracking
- Peak and off-peak consumption identification
- Load factor calculations
- Consumption variability analysis

### 📁 **Easy Data Import**
- Drag-and-drop Excel file upload (.xlsx, .xls, .csv)
- Automatic data validation and processing
- Support for standard energy data format: `energie (kwh) | ora | zi | luna`
- Real-time data preview and validation

### ☀️ **PV System Design**
- Automated photovoltaic system sizing
- Battery storage calculations
- Inverter sizing recommendations
- Three sizing options: Conservative, Optimal, Aggressive
- Technical specifications generation

### 💰 **Financial Analysis**
- Complete cost breakdown (panels, battery, inverter, installation)
- ROI calculations and payback period analysis
- Annual savings estimations
- 25-year financial projections
- System comparison charts

### 🎨 **Modern Interface**
- Responsive design for all devices
- Interactive charts and visualizations
- Professional engineering-focused UI
- Real-time data processing and analysis

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0, JavaScript (ES6+)
- **Build Tool**: Vite 6.3.6
- **Charts**: Recharts, Chart.js, React-ChartJS-2
- **File Processing**: SheetJS (xlsx)
- **Styling**: CSS3 with modern layouts
- **Testing**: Vitest, React Testing Library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cosmin-vestemean/energy-consumption-analyzer.git
   cd energy-consumption-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## 📋 Usage

1. **Upload Data**: Drag and drop your Excel file with energy consumption data
2. **Analyze**: Review the comprehensive analysis dashboard
3. **Design**: Get PV system recommendations with technical specifications
4. **Export**: Use the analysis for client presentations and system design

### Expected Data Format
```
energie (kwh) | ora | zi  | luna
1.6          | 0   | 1   | 6
1.79875      | 1   | 1   | 6
2.16195      | 9   | 1   | 6
...
```

- **energie (kwh)**: Energy consumption in kilowatt-hours
- **ora**: Hour of day (0-23)
- **zi**: Day of month (1-31)
- **luna**: Month (1-12)

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## 📈 Analysis Features

### Energy Consumption Analysis
- **Peak Hours Identification**: Automatically identifies top 5 peak consumption hours
- **Load Factor Calculation**: Measures system efficiency (Average/Peak consumption)
- **Consumption Distribution**: Analyzes energy usage patterns across different ranges
- **Time Series Analysis**: Tracks consumption trends over time
- **Variability Assessment**: Coefficient of variation for consumption predictability

### PV System Recommendations
- **Array Sizing**: Calculates optimal solar panel capacity
- **Battery Design**: Determines storage requirements for 2-day autonomy
- **Inverter Specifications**: Sizes power electronics with safety margins
- **Financial Analysis**: Complete cost breakdown and ROI calculations
- **System Options**: Conservative (80%), Optimal (100%), Aggressive (130%) sizing

## 🎯 Engineering Applications

Perfect for:
- **Energy Consultants**: Client energy audits and PV system proposals
- **Electrical Engineers**: Load analysis and system design
- **Solar Installers**: System sizing and cost estimation
- **Facility Managers**: Energy consumption optimization
- **Research**: Energy pattern analysis and efficiency studies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Chart libraries: Recharts and Chart.js
- File processing: SheetJS
- Designed for engineering professionals

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for engineers designing sustainable energy solutions**
