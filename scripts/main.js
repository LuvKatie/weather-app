// const handleError = fn => (...params) => fn(...params).catch(console.error);

function handleError(fn) {
    return function(...params) {
        return fn(...params).catch(function (err) {
            console.error('Oops!', err);
        });
    }
}


async function getWeather(loc) {
        let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=f5f4bd1498286db5b5db05d4cd17112c&units=imperial`, {mode: 'cors'});
        let response = await weather.json();


        let name = response.name;
        let overcast = capitalizeFirst(response.weather[0].description);
        let temp = roundNearest(response.main.temp);
        let tempMax = roundNearest(response.main.temp_max);
        let tempMin = roundNearest(response.main.temp_min);
        let windSpd = roundNearest(response.wind.speed);

        console.log(response);
        console.log(name);
        console.log(overcast);
        console.log(`Now: ${temp}, High ${tempMax}, Low: ${tempMin}, Wind: ${windSpd} mph`);

        return {
            name,
            overcast,
            temp,
            tempMax,
            tempMin,
            windSpd
        }
}

function populateWeatherDisplay(weatherData) {
        const name = document.querySelector("#city-name > p");
        const currTemp = document.querySelector(".currtemp");
        const overcastSel = document.querySelector(".overcast");
        const dayHigh = document.querySelector(".dayhigh");
        const dayLow = document.querySelector(".daylow");
        const windSpd = document.querySelector(".windspeed");

        name.textContent = weatherData.name;
        currTemp.textContent = "Currently" + "\r\n" + weatherData.temp + " F";
        overcastSel.textContent = weatherData.overcast;
        dayHigh.textContent = "Day high" + "\r\n" + weatherData.tempMax + " F";
        dayLow.textContent = "Day low" + "\r\n" + weatherData.tempMin + " F";
        windSpd.textContent = "Wind Speeds" + "\r\n" + weatherData.windSpd + "mph";
}

const getAndUpdate = async (loc) => {
    let resp = await getWeather(loc);
    populateWeatherDisplay(resp);
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
    const namePara = document.createElement("p");

    const currTempContainer = document.createElement("div");
    const currTemp = document.createElement("p");

    const miscInfo = document.createElement("div");
    const overcast = document.createElement("p");
    const dayHigh = document.createElement("p");
    const dayLow = document.createElement("p");
    const windSpd = document.createElement("p");


    container.id = "weather-display"
    currTempContainer.id = "currtemp-display";
    miscInfo.id = "misc-display";
    cityName.id = "city-name"

    currTemp.className = "currtemp";
    overcast.className = "overcast";
    dayHigh.className = "dayhigh";
    dayLow.className = "daylow";
    windSpd.className = "windspeed";


    body.appendChild(container);
    container.append(cityName, currTempContainer, miscInfo);
    cityName.appendChild(namePara);
    currTempContainer.appendChild(currTemp);
    miscInfo.append(overcast, dayHigh, dayLow, windSpd);
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
        search.length > 2 ? handleError(getAndUpdate(search)) : null;
    });
}

createWeatherDisplay();
createForm();
weatherSubmit();
