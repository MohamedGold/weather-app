
// ! Today
const todayDay = document.querySelector(".today-day");
const todayDateNum = document.getElementById("todayDate");
const todayMonth = document.querySelector(".today-month");
const todayLocation = document.querySelector(".today-forecast .location");
const todayTemp = document.querySelector(".today-forecast .today-temp");
const todayImgCond = document.querySelector(".today-forecast .today-cond-img");
const todayTextCond = document.querySelector(".today-forecast .today-cond-text");
const todayHumidity = document.querySelector(".today-forecast .humidity");
const todayWind = document.querySelector(".today-forecast .wind");
const todayWindDir = document.querySelector(".today-forecast .wind-dir");

// ! Second Day 
const secondDay = document.querySelector(".second-forecast .second-day");
const secondImgCond = document.querySelector(".second-forecast .second-day-cond-img");
const secondMaxTempCond = document.querySelector(".second-day-max-temp");
const secondMinTempCond = document.querySelector(".second-forecast .second-day-min-temp");
const secondDayText = document.querySelector(".second-forecast .second-day-text");

// ! Third Day 
const thirdDay = document.querySelector(".third-forecast .third-day");
const thirdImgCond = document.querySelector(".third-forecast .third-day-cond-img");
const thirdMaxTempCond = document.querySelector(".third-forecast .third-day-max-temp");
const thirdMinTempCond = document.querySelector(".third-forecast .third-day-min-temp");
const thirdDayText = document.querySelector(".third-forecast .third-day-text");

// ! Search Input 
const searchInput = document.getElementById("search-input");

// ! Api Key 
const API_KEY = "8aa43650a17b4ae49f842838241206";

// !==============================================!




// ! Get API Data 
async function getWeatherData(city) {

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`);
    const data = await response.json();
    console.log(data);
    return data;
  }
  catch (error) {
    console.log("Error is =>", error);
  }

}

// ! Get Today-Day Function 
function getTodayData(data) {
  let todayDate = new Date();
  todayDay.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" });
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" });
  todayDateNum.innerHTML = todayDate.getDate();
  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayImgCond.setAttribute("src", "https:" + data.current.condition.icon);
  todayTextCond.innerHTML = data.current.condition.text;
  todayHumidity.innerHTML = data.current.humidity + "%";
  todayWind.innerHTML = data.current.wind_kph + " km/h";
  todayWindDir.innerHTML = data.current.wind_dir;
}

// ! Get Second-Day Function 
function getSecondDayData(data) {
  secondDay.innerHTML = new Date(data.forecast.forecastday[1].date).toLocaleDateString("en-US", { weekday: "long" });
  secondImgCond.setAttribute("src", "https:" + data.forecast.forecastday[1].day.condition.icon);
  secondMaxTempCond.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + "°C";
  secondMinTempCond.innerHTML = data.forecast.forecastday[1].day.mintemp_c + "°C";
  secondDayText.innerHTML = data.forecast.forecastday[1].day.condition.text;
}

// ! Get Third-Day Function
function getThirdDayData(data) {
  thirdDay.innerHTML = new Date(data.forecast.forecastday[2].date).toLocaleDateString("en-US", { weekday: "long" });
  thirdImgCond.setAttribute("src", "https:" + data.forecast.forecastday[2].day.condition.icon);
  thirdMaxTempCond.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
  thirdMinTempCond.innerHTML = data.forecast.forecastday[2].day.mintemp_c + "°C";
  thirdDayText.innerHTML = data.forecast.forecastday[2].day.condition.text;
}

// ! Get AllData function 
async function getAllData(city = "cairo") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    getTodayData(weatherData);
    getSecondDayData(weatherData);
    getThirdDayData(weatherData);
  }
}

//! Initial call to populate data
getAllData();

// ! Search Input 
searchInput.addEventListener("input", function () {
  getAllData(searchInput.value);
});

