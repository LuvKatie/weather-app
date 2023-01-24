// const handleError = fn => (...params) => fn(...params).catch(console.error);

function handleError(fn) {
    return function(...params) {
        return fn(...params).catch(function (err) {
            console.error('Oops!', err);
        });
    }
}

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

function createWeatherDisplay() {
    const body = document.querySelector("body");
    const container = document.createElement("div");

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
        search.length > 2 ? getLocation(search) : null;
    });
}

createWeatherDisplay();
createForm();
weatherSubmit();