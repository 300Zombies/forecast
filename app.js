window.addEventListener("load", function () {
    let long;
    let lat;
    // set variables
    let temperatureDescription = document.querySelector("#temperature-description");
    let temperatureDegree = document.querySelector("#temperature-degree");
    let locationTimezone = document.querySelector("#location-timezone");
    let degreeSection = document.querySelector("#temperature");
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
                    // TODO: show celsius by default
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //  F to C
                    let celsius = (temperature - 32) * (5 / 9);

                    // set icon
                    setIcons(icon, document.querySelector("#icon"));

                    // change C/F
                    degreeSection.addEventListener("click", function () {
                        // TODO: new syntax & C/F use css after
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celsius;
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
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