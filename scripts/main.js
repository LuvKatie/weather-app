// const handleError = fn => (...params) => fn(...params).catch(console.error);

function handleError(fn) {
    return function(...params) {
        return fn(...params).catch(function (err) {
            console.error('Oops!', err);
        });
    }
}

async function getLocation(loc) {
        let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=f5f4bd1498286db5b5db05d4cd17112c&units=imperial`, {mode: 'cors'});
        handleError(getWeather(weather));
}

async function getWeather(loc) {
        let response = await loc.json();
        let name = response.name;
        let overcast = response.weather[0].description;
        let temp = roundNearest(response.main.temp);
        let tempMax = roundNearest(response.main.temp_max);
        let tempMin = roundNearest(response.main.temp_min);
        let windSpd = roundNearest(response.wind.speed);

        console.log(response);
        console.log(name);
        console.log(capitalizeFirst(overcast));
        console.log(`Now: ${temp}, High ${tempMax}, Low: ${tempMin}, Wind: ${windSpd} mph`);
}

function roundNearest(temp) {
    return Math.round(temp);
}

function capitalizeFirst(str) {
    let overcast = str.split(" ");
    let newStr = "";
    for (const word of overcast) {
        let first = word.slice(0, 1);
        let afterFirst = word.slice(1);
        newStr += first.toUpperCase() + afterFirst + " ";
    }
    return newStr;
}

function createWeatherDisplay() {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    const cityName = document.createElement("header");

    const currTempContainer = document.createElement("div");
    const currTemp = document.createElement("p");
    const miscInfo = document.createElement("div");

    container.id = "weather-display"

    body.appendChild(container);
}

function createForm() {
    const body = document.querySelector("body");
    const form = document.createElement("form");
    const formLabel = document.createElement("label");
    const formInput = document.createElement("input");
    const formSubmit = document.createElement("button");

    formInput.setAttribute('type', 'text');
    formInput.setAttribute('name', 'weather-search');
    formLabel.setAttribute('for', 'weather-search');

    formSubmit.textContent = "Get Weather";


    form.id = "weather-form";
    formInput.id = "weather-search";
    formSubmit.id = "weather-submit";
    
    formLabel.appendChild(formInput)
    form.append(formLabel, formSubmit);
    body.appendChild(form);
}

function weatherSubmit() {
    const formSubmit = document.getElementById("weather-submit");
    const formSearch = document.getElementById("weather-search");
    formSubmit.addEventListener("click", (e) => {
        let search = formSearch.value;
        e.preventDefault();
        search.length > 2 ? handleError(getLocation(search)) : null;
    });
}

createWeatherDisplay();
createForm();
weatherSubmit();