window.addEventListener("load", function () {
    let long;
    let lat;
    // set variables
    let temperatureDescription = document.querySelector("#temperature-description");
    let temperatureDegree = document.querySelector("#temperature-degree");
    let locationTimezone = document.querySelector("#location-timezone");
    let degreeSection = document.querySelector("#degree-section");
    const temperatureSpan = document.querySelector("#temperature span")
    const key = "c939533bf0d26e4e3692b962868c76b6";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`;

            fetch(api)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // console.log(data);
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;

                    // set DOM elements form API
                    // show celsius by default
                    //  F to C
                    let celsius = (temperature - 32) * (5 / 9); // Fahrenheit to Celsius
                    temperatureDegree.textContent = parseInt(celsius * 10) / 10; //temperature
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // set icon
                    setIcons(icon, document.querySelector("#icon"));

                    // change C/F
                    degreeSection.addEventListener("click", function () {
                        // TODO: change syntax & relocate C/F to element:after
                        if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = parseInt(temperature * 10) / 10;
                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = parseInt(celsius * 10) / 10;
                        }
                    });
                })
                .catch(function (error) {
                    console.log(`Something went wrong because ${error}`);
                });
        });
    } else {
        console.log("Please allow Google geolocation");
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
});