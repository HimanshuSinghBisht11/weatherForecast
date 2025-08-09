# Weather Web App 🌤️

A modern, responsive weather application built with React, Vite, and Tailwind CSS which provides real-time weather data.

## 🚀 Tech Stack

- **Frontend Framework**: React JS
- **Build Tool**: Vite 
- **Styling**: Tailwind CSS 
- **Icons**: Lucide React 



### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd weather_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Add your API keys
   VITE_WEATHER_API_KEY=your_weather_api_key
   VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
   ```

4. **Start the development server**
   ```bash
   npm run frontend
   ```


## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run frontend` | Start the development server with hot reload |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🏗️ Project Structure

```
weather_web/              
├── src/
│   ├── Assist_Components/     # Helper and utility components
│   │   ├── images/           # Image assets
│   │   ├── Error.jsx         # Error handling component
│   │   ├── Forecast.jsx      # Weather forecast component
│   │   ├── Greet.jsx         # Greeting component
│   │   ├── Loading.jsx       # Loading state component
│   │   ├── SearchBar.jsx     # Search functionality
│   │   ├── WeatherCard.jsx   # Main weather display
│   │   └── WeatherStats.jsx  # Weather statistics
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global styles
│   ├── main.jsx              # Application entry point
│   └── Server.js             # Server configuration
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Dependency lock file
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.js           # Vite configuration
```

## 🧩 Component Architecture

### Core Components
- **`SearchBar.jsx`**: Location search with autocomplete and validation
- **`WeatherCard.jsx`**: Main weather display with current conditions
- **`WeatherStats.jsx`**: Detailed weather metrics (humidity, wind, etc.)
- **`Forecast.jsx`**: Multi-day weather forecast with interactive cards
- **`Loading.jsx`**: Elegant loading states with animations
- **`Error.jsx`**: User-friendly error handling and messages
- **`Greet.jsx`**: Welcome screen and user onboarding

### Component Features
- **Modular Design**: Each component handles a specific functionality
- **Prop-driven**: Flexible and reusable with customizable props
- **State Management**: Efficient state handling with React hooks
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessible**: ARIA labels and keyboard navigation support

```bash
# .env.local
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_URL=https://api.openweathermap.org/
```




