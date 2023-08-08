import React from "react";
import "./custom.css";
import Preloader from "./Preloader.jsx";

const WeatherItems = ({
  handleLocationChange,
  fetchWeatherData,
  location,
  weatherData,
  hourlyForecast,
  fiveDayForecast,
  forecastData,
  formatTemperature,
  getDayOfWeek,
  getWeatherIcon,
  convertUnixTimeToReadable,
  getWeatherVideo,
  isLoading,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen p-10 ">
        {isLoading ? (
          <Preloader />
        ) : (
          weatherData && (
            <div>
              {/* Search Bar  */}
              <form
                className="flex items-center relative bottom-4 text-white "
                onSubmit={(event) => {
                  event.preventDefault();
                  fetchWeatherData();
                }}
              >
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className=" text-md rounded-lg block w-full pl-10 p-2.5 card-bg-color text-white "
                    placeholder="Search"
                    value={location}
                    onChange={handleLocationChange}
                  />
                </div>
                <button
                  type="text"
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>

              {/* Background Video For Weather */}
              {getWeatherVideo(weatherData.weather[0].main)}

              {/* Current Weather Data (Temp, Location etc */}
              <div className="flex justify-between m-7 text-white">
                <div className="flex flex-col">
                  <span className="font-bold text-5xl -mt-1 ">
                    {weatherData.name}
                  </span>
                  <span className="text-6xl font-bold">
                    {Math.round(weatherData.main.temp - 273.15)}°C
                  </span>

                  <span className="text-2xl">
                    {weatherData.weather[0].description.toLowerCase()}
                  </span>

                  <div className="flex justify-between items-center">
                    <span className="font-semibold mt-1  w-1/4 sm:w-full ">
                      H:{Math.round(weatherData.main.temp_max - 273.15)}°C
                    </span>

                    <span className="font-semibold mt-1  w-1/4 sm:w-full ">
                      {" "}
                      L:
                      {Math.round(weatherData.main.temp_min - 273.15)}°C
                    </span>
                  </div>
                </div>

                <span className="h-10 w-10">
                  {getWeatherIcon(weatherData.main.temp)}
                </span>
              </div>
            </div>
          )
        )}

        {/* Card No #1 (Hourly Forecast Section)  */}

        {hourlyForecast && hourlyForecast.list && (
          <div className="w-full max-w-screen-sm  p-10 rounded-xl ring-opacity-40 card-bg-color text-white">
            <span className="font-semibold text-lg w-1/3 ">
              3 Hour Forecast
            </span>
            <div className="flex justify-between mt-12 space-x-9 custom-container overflow-x-auto ">
              {hourlyForecast.list.map((item) => (
                <div className="flex flex-col items-center" key={item.dt_txt}>
                  <span className="font-semibold text-lg">
                    {Math.round(item.main.temp - 273.15)}°C
                  </span>

                  <span className="h-10 w-10 fill-current text-gray-400 mt-3">
                    {getWeatherIcon(item.main.temp)}
                  </span>

                  <span className="font-semibold mt-1 text-sm">
                    {new Date(
                      item.dt_txt.replace(/-/g, "/")
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Card No #2 (5 Days Forecast Weather) */}

        {fiveDayForecast && fiveDayForecast.list && (
          <>
            <div className="flex flex-col space-y-6 w-full max-w-screen-sm card-bg-color p-10 mt-10 rounded-xl  ring-opacity-40 text-white">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg w-1/3 ">
                  5 Day Forecast
                </span>
                <div className="relative left-8">
                  <span className="font-semibold text-lg w-1/4 sm:w-full ">
                    Min° /
                  </span>
                  <span className="font-semibold text-lg w-1/4 sm:w-full ">
                    {" "}
                    Max°
                  </span>
                </div>
              </div>

              {forecastData &&
                Object.entries(forecastData).map(([date, items]) => {
                  const minTemp = Math.min(
                    ...items.map((item) => item.main.temp_min)
                  );
                  const maxTemp = Math.max(
                    ...items.map((item) => item.main.temp_max)
                  );

                  return (
                    <div key={date}>
                      <div className="flex justify-between items-center">
                        <h3 className="w-1/5 font-bold">
                          {getDayOfWeek(date)}
                        </h3>
                        <span>{getWeatherIcon(minTemp)}</span>
                        <div className="relative left-5">
                          <span className="font-semibold text-lg w-1/4 sm:w-full">
                            {formatTemperature(minTemp)} /
                          </span>
                          <span className="font-semibold text-lg w-1/4 sm:w-full">
                            {formatTemperature(maxTemp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {/* Card No #3 (Humidity, Pressure etc ) */}
        {weatherData && (
          <div className="flex flex-col space-y-6 w-full max-w-screen-sm  p-10 mt-10 rounded-xl ring-1 ring-transparent ring-opacity-40 text-white ">
            <div className="flex justify-between items-center">
              <section className=" body-font ">
                <div className="container py-5 mx-auto">
                  <div className="flex flex-wrap  ">
                    <div className="p-4 md:w-1/3">
                      <div className="h-full border-opacity-60 rounded-lg overflow-hidden card-bg-color">
                        <div className="p-6 space-y-2">
                          <span className="font-semibold text-lg ">
                            Humidity
                          </span>
                          <img
                            className="w-[30%]"
                            src="./img/humidity.svg"
                            alt="humidity"
                          />
                          <div className="flex items-center flex-wrap ">
                            <span className="font-semibold text-lg  sm:w-full ">
                              {weatherData.main.humidity}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                      <div className="h-full  border-opacity-60 rounded-lg overflow-hidden card-bg-color">
                        <div className="p-6 space-y-2">
                          <span className="font-semibold text-lg ">
                            Pressure
                          </span>
                          <img
                            className="w-[32%]"
                            src="./img/pressure.svg"
                            alt="pressure"
                          />
                          <div className="flex items-center flex-wrap ">
                            <span className="font-semibold text-lg  sm:w-full ">
                              {weatherData.main.pressure} hpa
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                      <div className="h-full border-opacity-60 rounded-lg overflow-hidden card-bg-color">
                        <div className="p-6 space-y-2">
                          <span className="font-semibold text-lg">
                            Visibility
                          </span>
                          <img
                            className="w-[36%] "
                            src="./img/visibility.svg"
                            alt="visibility"
                          />
                          <div className="flex items-center flex-wrap ">
                            <span className="font-semibold text-xl sm:w-full ">
                              {weatherData.visibility / 1000} km
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                      <div className="h-full border-opacity-60 rounded-lg overflow-hidden card-bg-color">
                        <div className="p-6 space-y-2">
                          <span className="font-bold text-md ">Feels Like</span>
                          <img
                            className="w-[26%] "
                            src="./img/feels-like.svg"
                            alt="pressure"
                          />
                          <div className="flex items-center flex-wrap ">
                            <span className="font-semibold text-lg  sm:w-full ">
                              {Math.round(weatherData.main.feels_like - 273.15)}
                              °C
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                      <div className="h-full border-opacity-60 rounded-lg overflow-hidden card-bg-color">
                        <div className="p-6 space-y-2">
                          <span className="font-semibold text-lg">Wind</span>
                          <img
                            className="w-[32%] "
                            src="./img/wind.svg"
                            alt="pressure"
                          />
                          <div className="flex items-center flex-wrap ">
                            <span className="font-bold text-md sm:w-full ">
                              {weatherData.wind.speed} km / h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                      <div className="h-full border-opacity-60 rounded-lg overflow-hidden card-bg-color">
                        <div className="p-6 space-y-2">
                          <span className="font-semibold text-lg ">
                            Sunrise
                          </span>
                          <img
                            className="w-[35%] "
                            src="./img/sunrise.svg"
                            alt="pressure"
                          />
                          <div className="flex items-center flex-wrap ">
                            <span className="font-semibold text-sm  sm:w-full ">
                              {convertUnixTimeToReadable(
                                weatherData.sys.sunrise,
                                weatherData.timezone
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                      <div className="h-full border-opacity-60 rounded-lg overflow-hidden card-bg-color">
                        <div className="p-6 space-y-2">
                          <span className="font-semibold text-lg">Sunset</span>
                          <img
                            className="w-[35%] "
                            src="./img/sunset.svg"
                            alt="pressure"
                          />
                          <div className="flex items-center flex-wrap ">
                            <span className="font-semibold text-sm sm:w-full ">
                              {convertUnixTimeToReadable(
                                weatherData.sys.sunset,
                                weatherData.timezone
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default WeatherItems;
