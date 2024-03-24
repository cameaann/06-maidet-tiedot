import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Country from "./components/Country";
import CountryItem from "./components/CountryItem";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState([])

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
    console.log(name)
    setSearchWord(name)
    setSelectedCountry([])
  };

  const handleOnShow = (country)=>{
    setSelectedCountry(country)
  }

  const { filteredCountries, message } = filterCountries();

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
        <Filter handleChange={handleOnChange} />
        <Country country={country} />
      </div>
    );
  }

  if(selectedCountry.name && filteredCountries.length > 1){
    const country = selectedCountry
    return (
      <div>
        <Filter handleChange={handleOnChange} />
        <Country country={country} />
      </div>
    );
  } 

  return (
    <div>
      <Filter handleChange={handleOnChange} />
      {filteredCountries.map((x) => {
        return <CountryItem key={x.name.common} country={x} handleShow = {handleOnShow}/>
      })}
      <Notification message={message} />
    </div>
  );
};

export default App;
