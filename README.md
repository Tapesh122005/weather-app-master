# Weather App

A modern, responsive weather application that provides real-time weather updates for any city. This app features search history, unit toggling between Celsius and Fahrenheit, a loading animation, and a beautiful dark/light mode switch.

---

## 🌦️ Introduction

This Weather App allows users to search for current weather conditions in any city worldwide. It displays temperature, humidity, and supports toggling between Celsius and Fahrenheit. The app also features a search history, a smooth loading animation, and a user-friendly dark/light mode for comfortable viewing.

---

## ✨ Features

- **City Weather Search:** Get real-time weather for any city.
- **Humidity Display:** See the current humidity level.
- **Unit Toggle:** Switch between Celsius and Fahrenheit.
- **Search History:** Quickly revisit your last 5 searched cities.
- **Dark/Light Mode:** Toggle between dark and light themes.
- **Loading Animation:** Smooth loader while fetching data.
- **Responsive Design:** Works on desktop and mobile devices.

---

## 📁 File Structure (Detailed)

```
weather-app-master/
│
├── index.html         # The main HTML file that structures the app's user interface.
├── style.css          # All the styles and themes for the app, including dark/light mode and responsiveness.
├── script.js          # Main JavaScript file containing all app logic: fetching weather, handling UI, toggling units, theme, and history.
├── img/               # Folder containing image assets used in the app.
│   ├── sun3.png       # Weather icon for sunny conditions.
│   └── humidity.png   # Icon representing humidity.
└── README.md          # Project documentation (this file).
```

- **index.html:**  
  The entry point of the app. It links the CSS and JS files, and contains the structure for search, weather display, history, loader, and theme toggle.

- **style.css:**  
  Contains all the styling rules for the app, including layout, colors, gradients, button styles, loader animation, and both dark and light mode themes.

- **script.js:**  
  Handles all interactive features: fetching weather data from OpenWeatherMap, updating the DOM, managing search history, toggling between Celsius/Fahrenheit, switching themes, and showing/hiding the loader.

- **img/**  
  Stores image assets used in the app, such as weather icons and humidity indicators.

- **README.md:**  
  Documentation for the project, including introduction, features, setup instructions, and license.

You can copy and use this section to make

---

## 🚀 How to Run the Project Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Tapesh122005/weather-app-master.git
   ```

2. **Navigate to the project folder:**
   ```sh
   cd weather-app-master
   ```

3. **Open `index.html` in your browser.**

4. **(Optional) Replace the API key in `script.js` with your own from [OpenWeatherMap](https://openweathermap.org/).**

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

**Enjoy using the Weather App!**
