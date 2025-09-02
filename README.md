# LezGo Car Rental Dashboard

An elegant and compact dashboard for managing a car rental business, built with React and Tailwind CSS.

## Features

### 📊 Key Metrics
- **Today's Rides**: Current day ride count with trend comparison
- **Yesterday's Rides**: Previous day ride count for comparison
- **Today's Earnings**: Current day revenue with percentage change
- **Yesterday's Earnings**: Previous day revenue for comparison

### 📈 Analytics
- **Sales Charts**: Interactive line and bar charts comparing today vs yesterday
- **Hourly Revenue**: Distribution of earnings throughout the day
- **Fleet Overview**: Real-time car availability and status

### 🚗 Fleet Management
- **Total Cars**: Complete fleet count
- **Available Cars**: Ready-to-rent vehicles
- **Currently Rented**: Cars in active rental
- **In Maintenance**: Vehicles under service

### 💡 Additional Features
- **Customer Metrics**: Daily customer count tracking
- **Location Management**: Active rental locations
- **Fleet Utilization**: Percentage of cars currently in use
- **Average Revenue**: Per-ride earnings calculation
- **Quick Actions**: Fast access to common tasks
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Data refreshes every 30 seconds
- **Modern UI**: Clean, professional interface with smooth animations

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── StatCard.js          # Reusable metric cards
│   ├── SalesChart.js        # Chart components
│   └── CarsOverview.js      # Fleet status overview
├── App.js                   # Main dashboard component
├── index.js                 # React entry point
└── index.css               # Global styles with Tailwind
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Beautiful, composable charts
- **Lucide React**: Modern icon library
- **PostCSS & Autoprefixer**: CSS processing

## Customization

### Colors
The dashboard uses a carefully selected color palette:
- **Primary**: Blue tones for main actions
- **Success**: Green for positive metrics
- **Warning**: Orange for attention items
- **Danger**: Red for critical alerts

### Data Integration
Replace the mock data in `generateMockData()` function in `App.js` with real API calls to your backend service.

### Adding New Metrics
1. Create new stat cards using the `StatCard` component
2. Add new chart types using the `SalesChart` component
3. Extend the `CarsOverview` component for additional fleet metrics

## Mock Data

The dashboard currently uses generated mock data that includes:
- Random ride counts and earnings
- Simulated hourly sales data
- Fleet status information
- Customer and location metrics

## Performance Features

- **Lazy Loading**: Components load efficiently
- **Responsive Design**: Adapts to all screen sizes
- **Smooth Animations**: CSS transitions and transforms
- **Optimized Rendering**: React best practices implemented

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is proprietary software for LezGo Car Rental.
