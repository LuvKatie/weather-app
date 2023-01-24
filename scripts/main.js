async function getLocation(loc) {
    try {
        let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=f5f4bd1498286db5b5db05d4cd17112c&units=imperial`, {mode: 'cors'});
        getWeather(weather);
    } catch (err) {
        console.log(err);
    }
}

async function getWeather(loc) {
    try {
        let response = await loc.json();

        console.log(response.main, response.weather, response.name);
    } catch (err) {
        console.log(err);
    }
}

getLocation("London");