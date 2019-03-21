window.addEventListener("load", function () {
    let long;
    let lat;
    // TODO: set variables
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
                    console.log(data);
                    // TODO: set DOM element from the API
                });
        });
    }
});