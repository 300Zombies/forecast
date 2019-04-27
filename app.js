window.addEventListener("load", () => {
    let long;
    let lat;
    // set variables
    const temperatureDescription = document.querySelector("#temperature-description");
    const temperatureDegree = document.querySelector("#temperature-degree");
    const locationTimezone = document.querySelector("#location-timezone");
    const degreeSection = document.querySelector("#degree-section");
    const temperatureSpan = document.querySelector("#temperature span")
    const location = document.querySelector("#location");
    const temperature = document.querySelector("#temperature");
    const loading = document.querySelector(".loading");
    const key = "c939533bf0d26e4e3692b962868c76b6";
    // Auth key for develope only do not abuse please

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`;

            fetch(api)
                .then((response) => {
                    if (response.status === 429) {
                        return
                    }
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    const {
                        temperature,
                        summary,
                        icon,
                    } = data.currently;
                    const {
                        timezone
                    } = data;

                    // set DOM elements form API
                    // show celsius by default
                    //  F to C
                    showDescription(summary, timezone);
                    showCelsius(temperature);

                    // set icon
                    setIcons(icon, document.querySelector("#icon"));

                    // change C/F
                    degreeSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "°C") {
                            showFahrenheit(temperature);
                        } else {
                            showCelsius(temperature);
                        }
                    });
                })
                .then(() => {
                    loading.style.opacity = "0";
                    location.style.opacity = "1";
                    temperature.style.opacity = "1";
                })
                .catch((error) => {
                    console.log(error);
                    alert(`Heroku proxy restriction: Too Many Requests`);
                });
        });
    } else {
        alert("Please allow Google geolocation");
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({
            color: "white"
        });
        // replace every "-" to "_" in temperatureDescription
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

    function showDescription(summary, timezone) {
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = timezone;
    }

    function showCelsius(temperature) {
        let celsius = (temperature - 32) * (5 / 9);
        temperatureDegree.textContent = `${parseInt(celsius * 10) / 10}`;
        temperatureSpan.innerHTML = "&deg;C";
    }

    function showFahrenheit(temperature) {
        temperatureDegree.textContent = temperature;
        temperatureSpan.innerHTML = "&deg;F";
    }
});