import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Country from "./components/Country";
import CountryItem from "./components/CountryItem";
import Weather from "./components/Weather";
import weatherService from "./services/weatherService";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState([])
  
  useEffect(() => {
    countryService.getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  useEffect(() =>{
      weatherService.getWeatherInfo(selectedCountry).then((response)=>{
        setWeatherInfo(response)
      })
  }, [selectedCountry])

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
    console.log(name);
    setSearchWord(name);
    setSelectedCountry([]);
  };

  const handleOnShow = (country) => {
    setSelectedCountry(country)
  };


  const { filteredCountries, message } = filterCountries();

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    console.log(weatherInfo);

    return (
      <div>
        <Filter handleChange={handleOnChange} />
        <Country country={country} />
        <Weather weatherInfo={weatherInfo} capital={country.capital}/>
      </div>
    );
  }

  if (selectedCountry.name && filteredCountries.length > 1) {
    const country = selectedCountry;
    console.log(selectedCountry);
    console.log(weatherInfo);
    return (
      <div>
        <Filter handleChange={handleOnChange} />
        <Country country={country} />
        <Weather weatherInfo={weatherInfo} capital={country.capital}/>
      </div>
    );
  }

  return (
    <div>
      <Filter handleChange={handleOnChange} />
      {filteredCountries.map((x) => {
        return (
          <CountryItem
            key={x.name.common}
            country={x}
            handleShow={handleOnShow}
          />
        );
      })}
      <Notification message={message} />
    </div>
  );
};

export default App;
