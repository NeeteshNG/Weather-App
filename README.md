# Weather App

A modern, responsive weather application built with React that displays real-time weather data with dynamic temperature-based backgrounds and a 5-day forecast.

## Live Demo

[View Live Demo](https://NeeteshNG.github.io/Weather-App)

## Features

- **Real-time Weather Data** - Fetches current weather from OpenWeatherMap API
- **5-Day Forecast** - View weather predictions for the upcoming days
- **City Autocomplete** - Smart search suggestions as you type using Geocoding API
- **Search History** - Quick access to recently searched cities (stored in localStorage)
- **Unit Toggle** - Switch between Celsius (°C) and Fahrenheit (°F)
- **Dynamic Backgrounds** - Gradient background changes based on temperature:
  - Cold (< 10°C) - Deep blue gradient
  - Cool (10-20°C) - Navy blue gradient
  - Warm (20-30°C) - Purple-red gradient
  - Hot (> 30°C) - Deep red gradient
- **Detailed Weather Info** - Displays:
  - Current temperature & feels-like
  - Humidity percentage
  - Wind speed
  - Atmospheric pressure
  - Sunrise & sunset times
- **Glassmorphism UI** - Modern glass-effect design with smooth animations
- **Keyboard Navigation** - Navigate search suggestions with arrow keys
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - UI Library with Hooks
- **OpenWeatherMap API** - Weather data & geocoding
- **CSS3** - Custom glassmorphism styling
- **Font Awesome** - Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API Key (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/NeeteshNG/Weather-App.git

# Navigate to project directory
cd Weather-App

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API key to .env file
# REACT_APP_WEATHER_API_KEY=your_api_key_here

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## Configuration

1. Get your free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the root directory (or copy from `.env.example`)
3. Add your API key:

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

## Project Structure

```
src/
├── components/
│   ├── SearchBar.js     # Search input with autocomplete
│   ├── WeatherCard.js   # Main weather display
│   ├── Forecast.js      # 5-day forecast
│   ├── Loading.js       # Loading spinner
│   ├── Error.js         # Error display with retry
│   └── index.js         # Component exports
├── hooks/
│   └── useWeather.js    # Custom hook for weather state
├── utils/
│   └── api.js           # API functions
├── App.js               # Main application component
├── App.css              # Application styles
└── index.js             # Entry point
```

## API Usage

This project uses OpenWeatherMap APIs:

**Current Weather:**
```
https://api.openweathermap.org/data/2.5/weather?q={city}&units={units}&appid={API_KEY}
```

**5-Day Forecast:**
```
https://api.openweathermap.org/data/2.5/forecast?q={city}&units={units}&appid={API_KEY}
```

**City Autocomplete (Geocoding):**
```
https://api.openweathermap.org/geo/1.0/direct?q={query}&limit=5&appid={API_KEY}
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm test` | Run test suite |
| `npm run build` | Create production build |
| `npm run deploy` | Deploy to GitHub Pages |

## Author

**Neetesh Gupta**

- GitHub: [@NeeteshNG](https://github.com/NeeteshNG)
- LinkedIn: [neetesh-gupta](https://linkedin.com/in/neetesh-gupta)

## License

This project is open source and available under the [MIT License](LICENSE).
