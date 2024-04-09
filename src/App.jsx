import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import CountriesShortView from "./components/CountriesShortView";
import CountryFullView from "./components/CountryFullView";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  if (selectedCountry) {
    content = <CountryFullView country={selectedCountry} />;
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
      <div className="wrap-container">
        <Filter handleChange={handleOnChange} />
        {content}
      </div>
    </div>
  );
};

export default App;
