const APIKEY = "d54b108e96c80d6717d844eba8dad9a6",
      URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("city");
const searchBtn = document.getElementById("btn");
const historyList = document.getElementById("history");
const loader = document.getElementById("loader");

function getWeatherIcon(iconCode) {
    const iconMap = {
        "01d": "img/sun3.png",
        "01n": "img/moon.png",
        "02d": "img/cloudy-day.png",
        "02n": "img/cloudy-night.png",
        "03d": "img/cloud.png",
        "03n": "img/cloud.png",
        "04d": "img/clouds.png",
        "04n": "img/clouds.png",
        "09d": "img/rain.png",
        "09n": "img/rain.png",
        "10d": "img/rainy-day.png",
        "10n": "img/rainy-night.png",
        "11d": "img/thunder.png",
        "11n": "img/thunder.png",
        "13d": "img/snow.png",
        "13n": "img/snow.png",
        "50d": "img/mist.png",
        "50n": "img/mist.png"
    };
    return iconMap[iconCode] || "img/sun3.png";
}

function getTempIcon(tempC) {
    if (tempC >= 40) return "img/sun3.png";            // Very hot, clear day
    if (tempC >= 35) return "img/moon.png";            // Hot, clear night
    if (tempC >= 30) return "img/cloudy-day.png";      // Warm, few clouds day
    if (tempC >= 25) return "img/cloudy-night.png";    // Few clouds night
    if (tempC >= 20) return "img/cloud.png";           // Scattered clouds
    if (tempC >= 15) return "img/clouds.png";          // Broken clouds
    if (tempC >= 10) return "img/rain.png";            // Shower rain
    if (tempC >= 5)  return "img/rainy-day.png";       // Rain day
    if (tempC >= 0)  return "img/rainy-night.png";     // Rain night
    if (tempC >= -5) return "img/thunder.png";         // Thunderstorm
    if (tempC >= -10) return "img/snow.png";           // Snow
    if (tempC >= -20) return "img/mist.png";           // Mist
    return "img/sun3.png";                             // Default/fallback
}

async function checkWeather(city = 'Goa'){
    loader.style.display = "block"; 
    document.querySelector(".weather").style.display = "none"; 

    try {
        const res = await fetch(URL + city + `&appid=${APIKEY}&units=metric`);
        let data = await res.json();
        document.querySelector(".city").innerHTML = data.name;
        lastTempC = data.main.temp; 

        // Set weather icon based on temperature only
        document.querySelector(".weather-icon").src = getTempIcon(lastTempC);

        let displayTemp;
        let tempUnit;
        if (currentUnit === "metric") {
            displayTemp = Math.floor(lastTempC);
            tempUnit = "°C";
        } else {
            displayTemp = Math.floor((lastTempC * 9/5) + 32); 
            tempUnit = "°F";
        }
        document.querySelector(".temp").innerHTML = displayTemp + tempUnit;
        document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        saveToHistory(data.name);
        setTimeout(() => {
            loader.style.display = "none";
            document.querySelector(".weather").style.display = "block";
        }, 800);
    } catch (e) {
        setTimeout(() => {
            loader.style.display = "none";
            document.querySelector(".weather").style.display = "block";
        }, 800);
    }
}

let currentUnit = "metric";

const toggleBtn = document.getElementById("toggle-unit");

toggleBtn.addEventListener("click", () => {
    if (currentUnit === "metric") {
        currentUnit = "imperial";
        toggleBtn.textContent = "Show °C";
    } else {
        currentUnit = "metric";
        toggleBtn.textContent = "Show °F";
    }
    checkWeather(searchBox.value || "Goa");
});

let lastTempC = null;

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    city = city.trim();
    if (city && !history.includes(city)) {
        history.unshift(city);
        if (history.length > 5) history.pop(); 
        localStorage.setItem("weatherHistory", JSON.stringify(history));
        renderHistory();
    }
}

function renderHistory() {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    historyList.innerHTML = "";
    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.onclick = () => {
            checkWeather(city);
        };
        historyList.appendChild(li);
    });
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})
searchBox.addEventListener("keyup", (e)=>{
    if (e.key == "Enter") {
        checkWeather(searchBox.value)
    }
})

const themeBtn = document.getElementById("toggle-theme");

function setTheme(mode) {
    if (mode === "light") {
        document.body.classList.add("light-mode");
        themeBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light-mode");
        themeBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    }
}

themeBtn.addEventListener("click", () => {
    if (document.body.classList.contains("light-mode")) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
});

setTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");

renderHistory();
checkWeather()