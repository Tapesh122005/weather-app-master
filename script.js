const APIKEY = "d54b108e96c80d6717d844eba8dad9a6",
      URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("city");
const searchBtn = document.getElementById("btn");
const historyList = document.getElementById("history");
const loader = document.getElementById("loader");

async function checkWeather(city = 'Goa'){
    loader.style.display = "block"; // Show loader
    document.querySelector(".weather").style.display = "none"; // Hide weather info

    try {
        const res = await fetch(URL + city + `&appid=${APIKEY}&units=metric`);
        let data = await res.json();
        document.querySelector(".city").innerHTML = data.name;
        lastTempC = data.main.temp; // Always store in Celsius

        let displayTemp;
        let tempUnit;
        if (currentUnit === "metric") {
            displayTemp = Math.floor(lastTempC);
            tempUnit = "°C";
        } else {
            displayTemp = Math.floor((lastTempC * 9/5) + 32); // Convert to Fahrenheit
            tempUnit = "°F";
        }
        document.querySelector(".temp").innerHTML = displayTemp + tempUnit;
        document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        saveToHistory(data.name);

        // Show weather info after loader delay
        setTimeout(() => {
            loader.style.display = "none";
            document.querySelector(".weather").style.display = "block";
        }, 800); // 2000ms = 2 seconds
    } catch (e) {
        setTimeout(() => {
            loader.style.display = "none";
            document.querySelector(".weather").style.display = "block";
        }, 800);
    }
}

let currentUnit = "metric"; // "metric" for Celsius, "imperial" for Fahrenheit

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

let lastTempC = null; // Store last temperature in Celsius

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    city = city.trim();
    if (city && !history.includes(city)) {
        history.unshift(city);
        if (history.length > 5) history.pop(); // Keep only last 5
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

// On page load, set theme from localStorage
setTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");

renderHistory();
checkWeather()