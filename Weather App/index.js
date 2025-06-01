// Grabbing the elements we need for code to get the weather 
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// May need to generate a new weather api key
const apiKey = "feb3973c4d7ed843bbbc9968539658d7";

weatherForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch this weather data");
    }
    else {
        return await response.json();
    }
}

function displayWeatherInfo(data) {
    const {name:city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;
    
    // Reset any previous text inside the card
    card.textContent = "";
    card.style.display = "flex";
    
    // Creating the elements for the card
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Changing the text content of the elements of the cards
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp * 1.8) - 459.67).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Add the css class for each element of the cards
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Appending each item to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}


function getWeatherEmoji(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 500):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 701 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 805):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

