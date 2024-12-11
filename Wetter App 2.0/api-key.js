function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'bab281d79e5f1e9755a68d754cc313e7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    var play = document.getElementById('dino');
        
    if (city == 'dino' || city == 'dino spiel') {
        play.style.display = 'block';
    } else if (city != 'dino' || city != 'dino spiel' ) {
        play.style.display = 'none';
        
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Fehler:', error));
        
    } else {
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Fehler:', error));
    }

}


function displayWeather(data) {
    const weatherOutput = document.getElementById('weatherDegree');
    const city = document.getElementById('typedLocation');
    const feelTemp = document.getElementById('feelTemp');
    const humidity  = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const sunriseHTML = document.getElementById('sunrise');
    const sunsetHTML = document.getElementById('sunset');


    const hourlyUpdate = document.getElementById('hourlyUpdate')
    

    if (data && data.weather && data.main && data.sys) {
        city.innerHTML = `${data.name}`; // Stadt

        weatherOutput.innerHTML = `<p>${data.main.temp.toFixed(1)}</p>`; // Temperatur
        feelTemp.innerHTML = `${data.main.feels_like.toFixed(0)} °C`; // gefühlte Temperatur

        humidity.innerHTML = `${data.main.humidity} %`;    // Luftfeuchtigkeit
        wind.innerHTML = `${data.wind.speed} m/s`;        // Windgeschwindigkeit

        const sunrise = formatTime(data.sys.sunrise);
        const sunset = formatTime(data.sys.sunset);

        sunriseHTML.innerHTML = `${sunrise} Uhr`;  // Sonnenaufgang
        sunsetHTML.innerHTML = `${sunset} Uhr`;    // Sonnenuntergang

        hourlyUpdate.innerHTML = `<p>${data.main.temp.toFixed(1)}</p>`;
    } else {
        alert('Stadt nicht gefunden');
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp * 1000); // Unix-Timestamp in Millisekunden umwandeln
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }


    // Weather Icon
    const weatherIcon = document.getElementById('weatherIcon');
    const hourlyIcon  = document.getElementById('hourlyIcon');
    const icon = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;

    weatherIcon.innerHTML = `<img id="weatherIcon" src="${iconURL}">`;
    hourlyIcon.innerHTML = `<img id="weatherIcon" src="${iconURL}">`;


    
    // Weather Forecast (next Hours)
    const displayOutput = document.getElementById('nextHours');
    let html = '';
    let i = 0;

    while (i < 7) {
        html += `
            <div id="nexthour-time">
                <p id="hourlyTime"></p>
                <p id="hourlyUpdate"></p>
                <p id="celsius">°C</p>
                <div class="weather-image" id="hourlyIcon"></div>
            </div>
        `;
        i++;
    }
    displayOutput.innerHTML = html;

    console.log(data);
}

function easterEgg() {
    var value = document.getElementById('city-input').value;

        if (value == 'dino' || value == 'dino spiel') {
            play.style.display = 'block';
        } else if (value != 'dino' || value != 'dino spiel' ) {
            play.style.display = 'none';
        } else {
            console.log('Easter Egg nicht gefunden')
        }
}


document.getElementById("city-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        fetchWeather();
    }
});

function triggerEnter() {
    const startCity = "Düsseldorf";

    const inputElement = document.getElementById("city-input");
    inputElement.value = startCity;

    const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                fetchWeather();
            }
        }
    });

    inputElement.dispatchEvent(enterEvent);
}
triggerEnter();