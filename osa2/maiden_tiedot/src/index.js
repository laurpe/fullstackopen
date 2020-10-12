import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const Filter = (props) => {
  const { handleFilter } = props;

  return (
    <form>
      find countries <input onChange={handleFilter} />
    </form>
  );
};

const Country = (props) => {
  const { countriesToShow } = props;
  return (
    <div>
      <h1>{countriesToShow.map((country) => country.name)}</h1>
      <table>
        <tbody>
          <tr>
            <td>capital</td>
            <td>{countriesToShow.map((country) => country.capital)}</td>
          </tr>
          <tr>
            <td>population</td>
            <td>{countriesToShow.map((country) => country.population)}</td>
          </tr>
        </tbody>
      </table>
      <h2>Languages</h2>
      <ul>
        {countriesToShow[0].languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img
        src={countriesToShow[0].flag}
        width="240"
        alt={countriesToShow[0].name}
        title={countriesToShow[0].name}
      />
    </div>
  );
};

const Countries = (props) => {
  const { countriesToShow, handleClick } = props;

  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.numericCode}>
          {country.name}
          <button onClick={(event) => handleClick(country.name, event)}>
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

const Weather = (props) => {
  const { countriesToShow } = props;
  const [weather, setWeather] = useState();
  const city = countriesToShow[0].capital;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [city]);

  if (!weather) {
    return "Loading weather info";
  }

  return (
    <div>
      <h2>Weather in {countriesToShow[0].capital}</h2>
      <table>
        <tbody>
          <tr>
            <td>temperature</td>
            <td>{weather.current.temperature} °C</td>
          </tr>
          <tr>
            <td>
              <img
                src={weather.current.weather_icons}
                width="26"
                alt={weather.current.weather_descriptions[0]}
                title={weather.current.weather_descriptions[0]}
              />
            </td>
          </tr>
          <tr>
            <td>wind</td>
            <td>{weather.current.wind_speed} km/h</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleClick = (countryName, event) => {
    console.log(event);
    setNewFilter(countryName);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  if (countriesToShow.length === 1) {
    return (
      <div>
        <Filter handleFilter={handleFilter} />
        <Country countriesToShow={countriesToShow} />
        <Weather countriesToShow={countriesToShow} />
      </div>
    );
  } else if (countriesToShow.length <= 10 && countriesToShow.length > 0) {
    return (
      <div>
        <Filter handleFilter={handleFilter} />
        <Countries
          countriesToShow={countriesToShow}
          handleClick={handleClick}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Filter handleFilter={handleFilter} />
        <p>Too many matches, please specify another filter</p>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
