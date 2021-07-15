// import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: "",
      country: "",
      weather: undefined,
    };
  }

  getWeather = async () => {
    let resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},${this.state.country}&units=imperial&appid=8bbeb6c8d54c089734b5fdfae9c40c81`
    );
    let j = await resp.json();
    this.setState({ weather: j });
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
    const { weather } = this.state;
    return (
      <div className="container">
        <div class="columns">
          <div class="column">
            <input
              onChange={this.SetZipcode}
              class="input is-primary"
              type="text"
              value={this.state.zipcode}
              placeholder="Enter Zipcode"
            />
            <input
              onChange={this.SetCountry}
              class="input is-primary"
              type="text"
              value={this.state.country}
              placeholder="Enter Country Code"
            />
            <button onClick={this.getWeather} className="button is-primary">
              Get Weather
            </button>
          </div>
          <div class="column">
            {this.state.weather ? (
              <div></div>


            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
