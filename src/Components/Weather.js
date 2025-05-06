import "./Weather.css";
import searcIcon from "../imgs/search.png";
import clearIcon from "../imgs/clear.png";
import cloudIcon from "../imgs/cloud.png";
import drizzleIcon from "../imgs/drizzle.png";
import rainIcon from "../imgs/rain.png";
import snowIcon from "../imgs/snow.png";
// import windIcon from "../imgs/wind.png";
import HumidityIcon from "../imgs/humidity.png";
import windIcon from "../imgs/wind.png";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
function Weather() {
  let theInput = useRef();
  const today = new Date();
  const day = today.getDate();
  const monthName = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  //   let apikey = `e6e1ac4e031c99f667eb54491e858a8f`;
  // let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`;
  // let url = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=e6e1ac4e031c99f667eb54491e858a8f&units=metric`;
  // https://openweathermap.org/img/wn/02n.png
  let [WeatherData, setWeatherData] = useState(null);

  let fetchWeatherData = async (cityName) => {
    let apikey = `e6e1ac4e031c99f667eb54491e858a8f`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`;

    let response = await fetch(url);
    console.log(response);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      setWeatherData(data);
      theInput.current.value = "";
    } else {
      Swal.fire({
        title: `${cityName} Wrong City Name`,
        text: `Error: ${cityName}  ${response.statusText}`,
      });
    }
  };

  useEffect(() => {
    fetchWeatherData("Cairo");
  }, []);

  // icons
  let allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": drizzleIcon,
    "02n": drizzleIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  let imageIcon = clearIcon;
  if (WeatherData) {
    let icon = WeatherData.weather[0].icon;
    imageIcon = allIcons[icon] || clearIcon;
  }

  let sunriseAndSunset = (sun) => {
    const sunriseUTC = new Date(sun * 1000);

    const localSunrise = new Date(sunriseUTC.getTime());
    const formattedTime = localSunrise.toLocaleTimeString({
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log(formattedTime);
    return formattedTime;
  };
  // sunriseAndSunset(10800, 1746500872);

  return (
    <div className="weather p-3 p-md-5 ">
      <div className="search-bar w-100">
        <input ref={theInput} type="text" placeholder="Enter City Name" />
        <img
          src={searcIcon}
          alt=".."
          onClick={() => {
            if (theInput.current.value === "") {
              Swal.fire({
                title: "please enter your city name",
              });
            } else {
              fetchWeatherData(theInput.current.value);
            }
          }}
        />
      </div>
      <img src={imageIcon} alt=".." className="weather-icon" />
      <p className="fs-2 mb-4 yellow-color">
        {WeatherData && WeatherData.weather[0].description}
      </p>
      <p className="fs-2">{`Today: ${monthName} ${day}, ${year}`}</p>

      <p className="temperature ">
        {WeatherData && `${Math.round(WeatherData.main.temp)}°C`}
      </p>

      <p className="location">
        {WeatherData && `${WeatherData.name}, ${WeatherData.sys.country}`}
      </p>
      <div className="min-max-temp">
        <p className="fs-3">
          Minimum :{" "}
          <span className="yellow-color fs-2">
            {WeatherData && WeatherData.main.temp_min}°C
          </span>{" "}
        </p>
        <p className="fs-3">
          Maximum :{" "}
          <span className="yellow-color fs-2">
            {WeatherData && WeatherData.main.temp_max}°C
          </span>
        </p>
      </div>
      <div className="sunrise-snset fs-3  ">
        <p className="sunrise ">
          Sunrise Time:{" "}
          <span className="yellow-color">
            {WeatherData && sunriseAndSunset(WeatherData.sys.sunrise)}
          </span>
        </p>
        <p className="sunset ">
          Sunset Time:{" "}
          <span className="yellow-color">
            {WeatherData && sunriseAndSunset(WeatherData.sys.sunset)}
          </span>
        </p>
      </div>
      <div className="weather-data d-flex  justify-content-between w-100 mt-5 flex-column flex-md-row gap-3 gap-md-0">
        <div className="d-flex  align-items-start gap-3">
          <img className="mt-2" src={HumidityIcon} alt=".." />
          <div className="d-flex flex-column  ">
            <p className=" mb-0 fs-4">
              {WeatherData && `${Math.round(WeatherData.main.humidity)}%`}
            </p>
            <span className=" fs-5 yellow-color">Humidity</span>
          </div>
        </div>
        <div className="d-flex  align-items-start gap-3">
          <img className="mt-2" src={windIcon} alt=".." />
          <div className="d-flex flex-column  ">
            <p className=" mb-0 fs-4">
              {" "}
              {WeatherData && `${Math.round(WeatherData.wind.speed)}km/s`}
            </p>
            <span className=" fs-5 yellow-color">Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
