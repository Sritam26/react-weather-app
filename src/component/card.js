import React, { useEffect, useRef, useState } from "react";
import windIcon from "./assets/pngwing.com (3).png";
import "../component/card.css";

export default function Card() {
  const [weatherdata, setweatherdata] = useState(false);

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f859d74cd5fc5f4eb27f399d24f78b3d`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setweatherdata({
        humidity: data.main.humidity,
        temperature: data.main.temp,
        sealevel: data.main.sealevel,
        feelslike: data.main.feels_like,
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        name: data.name,
        weathertype: data.weather[0].description,  // Fixed here
        wind: data.wind.speed,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const inputRef = useRef();

  useEffect(() => {
    search("Bhubaneswar");
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center align-items-center">
        <form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form reload
            search(inputRef.current.value);
          }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            ref={inputRef} 
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </nav>

      <div className="card container" style={{ height: "30rem" }}>
        <img
          src={weatherdata.icon}
          className="card-img-top container"
          style={{ width: "9rem" }}
          alt="Weather Icon"
        />
        <div className="card-body">
          <h5
            className="card-title container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1>{weatherdata.weathertype}</h1>
            <h1>
              {weatherdata.name} <br />
            </h1>
            temp: {weatherdata.temperature} <br />
          </h5>
          <p className="card-text container">Humidity: {weatherdata.humidity}</p>
          <p className="card-text container">
            <img src={windIcon} style={{ width: "1rem" }} alt="Wind Icon" />
            Wind speed: {weatherdata.wind}
          </p>
          <p className="card-text container">
            Feels like: {weatherdata.feelslike}
          </p>
        </div>
      </div>
    </div>
  );
}
