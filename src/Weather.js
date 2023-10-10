import React, { useState, useRef, useEffect } from "react";
import "./custom.css";
import WeatherItems from "./WeatherItems.jsx";
import LazyLoad from "react-lazy-load";
const Weather = () => {
  // All The States
  const [location, setLocationChange] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // To fetch data as soon as the component loads
  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;

      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=${apiKey}`;
      const weatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Lahore&appid=${apiKey}`;

      try {
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();

        const hourlyForecastResponse = await fetch(weatherForecastUrl);
        const hourlyForecastData = await hourlyForecastResponse.json();

        const fiveDayForecastResponse = await fetch(weatherForecastUrl);
        const fiveDayForecastData = await fiveDayForecastResponse.json();

        setWeatherData(currentWeatherData);
        setHourlyForecast(hourlyForecastData);
        setFiveDayForecast(fiveDayForecastData);

        const forecastData = groupByDate(fiveDayForecastData.list);
        setForecastData(forecastData);

        console.log(currentWeatherData);
        console.log(hourlyForecastData);
        console.log(fiveDayForecastData);
        setIsLoading(false);
      } catch (error) {
        console.error("error fetching weather data", error);
        setIsLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  // Function to pause video upon switching tabs
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        videoRef.current.pause(); // Pause the video when the page becomes hidden
      } else if (document.visibilityState === "visible") {
        videoRef.current.play(); // Resume video playback when the page becomes visible
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Show icons on specific temperatures
  const getWeatherIcon = (temperature) => {
    const celsiusTemperature = temperature - 273.15; // Convert from Kelvin to Celsius

    if (celsiusTemperature > 25) {
      return <img src={process.env.PUBLIC_URL + "/img/sun.svg"} alt="Sun" />; // Clear Sky
    } else if (celsiusTemperature >= 20 && celsiusTemperature <= 25) {
      return (
        <img src={process.env.PUBLIC_URL + "/img/few-clouds.svg"} alt="Sun" />
      ); // Few Clouds
    } else if (celsiusTemperature >= 15 && celsiusTemperature < 20) {
      return (
        <img
          src={process.env.PUBLIC_URL + "/img/scattered-clouds.svg"}
          alt="Sun"
        />
      ); // Scattered Clouds
    } else if (celsiusTemperature >= 10 && celsiusTemperature < 15) {
      return (
        <img
          src={process.env.PUBLIC_URL + "/img/broken-clouds.svg"}
          alt="Sun"
        />
      ); // Broken Clouds
    } else if (celsiusTemperature >= 5 && celsiusTemperature < 10) {
      return (
        <img src={process.env.PUBLIC_URL + "/img/shower-rain.svg"} alt="Sun" />
      ); // Shower Rain
    } else if (celsiusTemperature >= 0 && celsiusTemperature < 5) {
      return <img src={process.env.PUBLIC_URL + "/img/rain.svg"} alt="Sun" />; // Rain
    } else if (celsiusTemperature >= -10 && celsiusTemperature < 0) {
      return (
        <img src={process.env.PUBLIC_URL + "/img/thunder.svg"} alt="Sun" />
      ); // Thunderstorm
    } else if (celsiusTemperature < -10) {
      return <img src={process.env.PUBLIC_URL + "/img/snowy.svg"} alt="Sun" />; // Snow
    } else {
      return "🌫️"; // Mist
    }
  };

  // Function to play the backgound video smoothly

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (video.duration - video.currentTime <= 0.7) {
      video.currentTime = 0;
      video.play();
    }
  };

  // Show backgound videos according to the fetched API data
  const getWeatherVideo = (weather) => {
    if (weather.includes("Clear")) {
      return (
        <LazyLoad>
          dangerouslySetInnerHTML=
          {{
            __html: `<video
            className="video-background"
            src={process.env.PUBLIC_URL + "/img/sunny.mp4"}
            alt=""
            autoPlay
            loop
            muted
            preload="auto"
            onTimeUpdate={handleVideoTimeUpdate}
            ref={videoRef}
          />`,
          }}
        </LazyLoad>
      );
    } else if (weather.includes("Clouds")) {
      return (
        <LazyLoad>
          dangerouslySetInnerHTML=
          {{
            __html: `<video
            className="video-background"
            src={process.env.PUBLIC_URL + "/img/cloudy.mp4"}
            alt=""
            autoPlay
            loop
            muted
            preload="auto"
            onTimeUpdate={handleVideoTimeUpdate}
            ref={videoRef}
          />`,
          }}
        </LazyLoad>
      );
    } else if (weather.includes("Rain")) {
      return (
        <LazyLoad>
          dangerouslySetInnerHTML=
          {{
            __html: `<video
            className="video-background"
            src={process.env.PUBLIC_URL + "/img/rainy.mp4"}
            alt=""
            autoPlay
            loop
            muted
            preload="auto"
            onTimeUpdate={handleVideoTimeUpdate}
            ref={videoRef}
          />`,
          }}
        </LazyLoad>
      );
    } else if (weather.includes("Thunderstorm")) {
      return (
        <LazyLoad>
          dangerouslySetInnerHTML=
          {{
            __html: `<video
            className="video-background"
            src={process.env.PUBLIC_URL + "/img/thunderstorm.mp4"}
            alt=""
            autoPlay
            loop
            muted
            preload="auto"
            onTimeUpdate={handleVideoTimeUpdate}
            ref={videoRef}
          />`,
          }}
        </LazyLoad>
      );
    } else if (weather.includes("Snow")) {
      return (
        <LazyLoad>
          dangerouslySetInnerHTML=
          {{
            __html: `<video
            className="video-background"
            src={process.env.PUBLIC_URL + "/img/snowy.mp4"}
            alt=""
            autoPlay
            loop
            muted
            preload="auto"
            onTimeUpdate={handleVideoTimeUpdate}
            ref={videoRef}
          />`,
          }}
        </LazyLoad>
      );
    } else {
      return (
        <LazyLoad>
          dangerouslySetInnerHTML=
          {{
            __html: `<video
            className="video-background"
            src={process.env.PUBLIC_URL + "/img/sunny.mp4"}
            alt=""
            autoPlay
            loop
            muted
            preload="auto"
            onTimeUpdate={handleVideoTimeUpdate}
            ref={videoRef}
          />`,
          }}
        </LazyLoad>
      );
    }
  };

  // Function to get sunset, sunrise values in a readable form
  const convertUnixTimeToReadable = (unixTimestamp, timeZoneOffsetSeconds) => {
    const date = new Date((unixTimestamp + timeZoneOffsetSeconds) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // Determine the AM/PM indicator
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format the time as "hh:mm:ss AM/PM"
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${amPm}`;

    return formattedTime;
  };
  // Fucntion to set data of setForecastData

  const groupByDate = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  // Convert Temperature
  const formatTemperature = (temperature) => {
    return Math.round(temperature - 273.15) + "°C";
  };

  // Fucntion to get day of the week
  const getDayOfWeek = (dateString) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  // To change location state when the search input is clicked
  const handleLocationChange = (event) => {
    setLocationChange(event.target.value);
  };

  // To fetch updated weather data
  const fetchWeatherData = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const weatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

    try {
      const currentWeatherResponse = await fetch(currentWeatherUrl);
      const currentWeatherData = await currentWeatherResponse.json();

      const hourlyForecastResponse = await fetch(weatherForecastUrl);
      const hourlyForecastData = await hourlyForecastResponse.json();

      const fiveDayForecastResponse = await fetch(weatherForecastUrl);
      const fiveDayForecastData = await fiveDayForecastResponse.json();

      setWeatherData(currentWeatherData);
      setHourlyForecast(hourlyForecastData);
      setFiveDayForecast(fiveDayForecastData);

      const forecastData = groupByDate(fiveDayForecastData.list);
      setForecastData(forecastData);

      console.log(currentWeatherData);
      console.log(hourlyForecastData);
      console.log(fiveDayForecastData);
    } catch (error) {
      console.error("error fetching weather data", error);
    }
  };
  return (
    <div>
      <WeatherItems
        handleLocationChange={handleLocationChange}
        fetchWeatherData={fetchWeatherData}
        weatherData={weatherData}
        location={location}
        hourlyForecast={hourlyForecast}
        fiveDayForecast={fiveDayForecast}
        forecastData={forecastData}
        formatTemperature={formatTemperature}
        getDayOfWeek={getDayOfWeek}
        getWeatherIcon={getWeatherIcon}
        convertUnixTimeToReadable={convertUnixTimeToReadable}
        getWeatherVideo={getWeatherVideo}
        isLoading={isLoading}
      />
    </div>
  );
};
export default Weather;
