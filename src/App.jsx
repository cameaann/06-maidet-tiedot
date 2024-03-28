import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import weatherService from "./services/weatherService";
import CountriesShortView from "./components/CountriesShortView";
import CountryFullView from "./components/CountryFullView";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      weatherService.getWeatherInfo(selectedCountry).then((response) => {
        setWeatherInfo(response);
      });
    }
  }, [selectedCountry]);

  const filterCountries = () => {
    if (searchWord) {
      const arr = countries.filter((x) =>
        x.name.common.toLowerCase().includes(searchWord.toLowerCase())
      );

      if (arr.length > 10) {
        return {
          filteredCountries: [],
          message: "Too many matches, specify another filter",
        };
      } else {
        return { filteredCountries: arr, message: "" };
      }
    }
    return { filteredCountries: [], message: "" };
  };

  const handleOnChange = (name) => {
    setSearchWord(name);
    setSelectedCountry(null);
  };

  const handleOnShow = (country) => {
    setSelectedCountry(country);
  };

  const { filteredCountries, message } = filterCountries();

  if (filteredCountries.length === 1 && !selectedCountry) {
    setSelectedCountry(filteredCountries[0]);
  }

  let content;

  if (selectedCountry && weatherInfo) {
    content = (
      <CountryFullView country={selectedCountry} weatherInfo={weatherInfo} />
    );
  } else {
    content = (
      <div>
        <CountriesShortView
          countries={filteredCountries}
          handleShow={handleOnShow}
        />
        <Notification message={message} />
      </div>
    );
  }

  return (
    <div>
      <Filter handleChange={handleOnChange} />
      {content}
    </div>
  );
};

export default App;
