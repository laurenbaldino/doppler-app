import "./App.css";
import React from "react";
import WeatherInfo from "./weatherInfo";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: "14611",
      country: "US",
      weather: undefined,
      history: JSON.parse(localStorage.getItem("history"))  || [],
    };
  }

  getWeather = async () => {
    let resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},${this.state.country}&units=imperial&appid=8bbeb6c8d54c089734b5fdfae9c40c81`
    );
    let j = await resp.json();
    this.setState({ weather: j });
    this.setState(
      {
        history: [
          {
            zipcode: this.state.zipcode,
            country: this.state.country,
            city: this.state.weather.name,
          },
          ...this.state.history,
        ],
      },
      () => localStorage.setItem("history", JSON.stringify(this.state.history))
    );

    console.log(this.state.history);
  };

  getWeatherIcon = (description) => {
    let iconName = "";
    switch (description) {
      case "light rain" || "mist" || "rain" || "shower rain":
        iconName = "fa-cloud-rain";
        break;
      case "clear sky":
        iconName = "fa-sun";
        break;
      case "snow":
        iconName = "fa-snowflake";
        break;
      case "few clouds" || "scattered clouds" || "broken clouds":
        iconName = "fa-cloud";
        break;
      case "thunderstorm":
        iconName = "fa-bolt";
        break;
    }
    return iconName;
  };

  SetZipcode = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
  };

  SetCountry = (e) => {
    this.setState({
      country: e.target.value,
    });
  };
  render() {
    return (
      <div style={{ padding: "15px" }} className="container">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-8">
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article
                  class="tile is-child notification box"
                  style={{ backgroundColor: "#82BCFA" }}
                >
                  <p class="title">Search Location</p>
                  <div class="field">
                    <div class="control">
                      <input
                        style={{ width: "50%" }}
                        onChange={this.SetZipcode}
                        class="input is-secondary"
                        type="text"
                        value={this.state.zipcode}
                        placeholder="Enter Zipcode"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <input
                      style={{ width: "50%" }}
                      onChange={this.SetCountry}
                      class="input is-secondary"
                      type="text"
                      value={this.state.country}
                      placeholder="Enter Country Code"
                    />
                  </div>

                  <button
                    onClick={this.getWeather}
                    className="button is-secondary"
                  >
                    Get Weather
                  </button>
                </article>
              </div>
            </div>
            <div class="tile is-parent">
              <article
                class="tile is-child notification box"
                style={{ backgroundColor: "#BBDAFA" }}
              >
                <div class="content">
                  <p class="title">Recent Searches</p>
                  <div class="content">
                    {this.state.history.map(historyElements => <p>{historyElements.city}</p>)}
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div style={{ height: "100vh" }} class="tile is-parent">
            <article
              class="tile is-child notification box"
              style={{ backgroundColor: "#5090C3" }}
            >
              <div class="content">
                <p class="title">Weather</p>
                {this.state.weather ? (
                  <div>
                    <WeatherInfo icon={"fa-home"} description={`City: ${this.state.weather.name}`}/>
                    <WeatherInfo icon={"fa-thermometer-three-quarters"} description={"Temperature: " + this.state.weather.main.temp}/>
                    
            
                    <p>Feels Like: {this.state.weather.main.feels_like} °</p>
                    <p>MAX: {this.state.weather.main.temp_min} °</p>
                    <p>MIN: {this.state.weather.main.temp_max} °</p>
                    <p>Cloud Cover: {this.state.weather.clouds.all}%</p>
                    <p>Humidity: {this.state.weather.main.humidity}%</p>
                    <p>Pressure: {this.state.weather.main.pressure}</p>
                    <p>Wind: {this.state.weather.wind.speed}mph</p>
                  </div>
                ) : (
                  <p>Location not found.</p>
                )}
                <div class="content"></div>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
