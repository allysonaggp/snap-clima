//variaveis e seleção de elementos
const apiKey = "fea385abf90bd7ddffc2017e3754b1e4";

const dateInput = document.querySelector("#current-date");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-button");
const tempElement = document.querySelector("#current-temperature");
const discElement = document.querySelector("#weather-discription");
const cityElement = document.querySelector("#city-name");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#current-humidity");
const windElement = document.querySelector("#wind-speed");
const tempSenseElement = document.querySelector("#feels-like-temperature");
const sunriseElement = document.querySelector("#sunset-time");
const sunsetElement = document.querySelector("#sunrise-time");


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
 
    const city = cityInput.value; 
 
    showWeatherData(city);
 });

 navigator.geolocation.getCurrentPosition((city) => {
    console.log(city);
  })
  

//função
const getWeatherData = async (city) => 
{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    //console.log(data); 
    //serve para retornar valores na tela console para testes
    return data
};

const showWeatherData = async (city) => 
{
    const data = await getWeatherData(city);

    dateInput.innerText = formatDate(data.sys.sunrise);
    cityElement.innerText = data.name;
    tempElement.innerText = `${Math.round(data.main.temp)}°C`;
    discElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src",` assets/${data.weather[0].icon}.svg`);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${Math.round(data.wind.speed)} Km/h`;
    tempSenseElement.innerText = `${Math.round(data.main.feels_like)}°C`;
    sunriseElement.innerText = formatTime(data.sys.sunrise);
    sunsetElement.innerText = formatTime(data.sys.sunrise);
    
};

//função tempo
function formatTime(epochTime)
{
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}
//função data
function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt-BR', {month: "long", day: 'numeric' })
    return `Hoje, ${formattedDate}`
  }
  



