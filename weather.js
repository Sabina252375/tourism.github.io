
// Weather descriptions
function getWeatherDescription(code) {
    const weather = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Fog",
        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Rain showers",
        81: "Moderate rain showers",
        82: "Heavy rain showers",
        95: "Thunderstorm"
    };

    return weather[code] || "Weather information";
}

// Weather icons
function getWeatherIcon(code) {
    if (code <= 1) return "☀️";
    if (code === 2) return "🌤️";
    if (code === 3) return "☁️";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 65) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";

    return "🌡️";
}

// Load weather data
async function loadWeather() {

    const weatherCard = document.getElementById("weather-card");

    if (!weatherCard) return;

    // Get destination information from HTML
    const city = weatherCard.dataset.city;
    const latitude = weatherCard.dataset.latitude;
    const longitude = weatherCard.dataset.longitude;

    // Show loading message
    weatherCard.innerHTML = `
        <p class="weather-loading">
            Loading weather...
        </p>
    `;

    try {

        // Open-Meteo API request
        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
            `&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to load weather data");
        }

        const data = await response.json();

        const current = data.current;

        // Display received information
        weatherCard.innerHTML = `
            <div class="weather-icon">
                ${getWeatherIcon(current.weather_code)}
            </div>

            <h3>${city}</h3>

            <p class="weather-temperature">
                ${Math.round(current.temperature_2m)}°C
            </p>

            <p class="weather-description">
                ${getWeatherDescription(current.weather_code)}
            </p>

            <div class="weather-details">

                <div>
                    <span>💧</span>
                    <p>${current.relative_humidity_2m}%</p>
                    <small>Humidity</small>
                </div>

                <div>
                    <span>🌬️</span>
                    <p>${Math.round(current.wind_speed_10m)} km/h</p>
                    <small>Wind speed</small>
                </div>

                <div>
                    <span>🌡️</span>
                    <p>${Math.round(current.apparent_temperature)}°C</p>
                    <small>Feels like</small>
                </div>

            </div>

            <p class="weather-updated">
                Current weather
            </p>
        `;

    } catch (error) {

        console.error("Weather API error:", error);

        weatherCard.innerHTML = `
            <p class="weather-error">
                Unable to load weather data.
            </p>

            <button onclick="loadWeather()" class="weather-retry">
                Try again
            </button>
        `;
    }
}

// Start when the page loads
document.addEventListener("DOMContentLoaded", loadWeather);
