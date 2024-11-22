var inputCity = document.querySelector("#inputCity");
var fetchWeather = document.querySelector("#fetchWeather");
var weatherDetails = document.querySelector("#weatherDetails");
var locationDetails = document.querySelector("#locationDetails");

fetchWeather.addEventListener("click", () => {
    var city = inputCity.value;
    fetch(`https://api.weatherapi.com/v1/current.json?key=36c2acecee0040ec84d120429241811&q=${city}&aqi=no`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                weatherDetails.innerHTML = `<h1>${data.error.message}</h1>`;
                locationDetails.classList.add("hidden");
                return;
            }
            weatherDetails.innerHTML = `
                <img id="icon" src="${data.current.condition.icon}" alt="Weather Icon" class="mx-auto">
                <h2 id="locationName" class="text-lg font-bold">${data.location.name}</h2>
                <p id="temperatureInfo">Temperature: ${data.current.temp_c}°C | Feels Like: ${data.current.feelslike_c}°C</p>
                <p id="updateTime">Updated: ${data.current.last_updated}</p>
            `;

            locationDetails.classList.remove("hidden");
            locationDetails.innerHTML = `
                <h2 class="text-lg font-semibold">Location Details</h2>
                <p id="regionInfo">Region: ${data.location.region}</p>
                <p id="countryInfo">Country: ${data.location.country}</p>
            `;
        })
        .catch((error) => {
            weatherDetails.innerHTML = `<h1>Failed to fetch data</h1>`;
            locationDetails.classList.add("hidden");
        });

    inputCity.value = "";
});
