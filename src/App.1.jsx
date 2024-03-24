import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

export const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

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
  };

  const { filteredCountries, message } = filterCountries();

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    console.log(filteredCountries);
    console.log(country.name.common);

    return (
      <div>
        <Filter handleChange={handleOnChange} />

        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        {/* <div>{filteredCountries.languages.map(lang => { return <li key = {lang.id}>{lang}</li> })}</div> */}
      </div>
    );
  }

  return (
    <div>
      <Filter handleChange={handleOnChange} />
      {filteredCountries.map((x) => {
        return <div key={x.name.common}>{x.name.common}</div>;
      })}
      <Notification message={message} />
    </div>
  );
};
