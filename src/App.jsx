import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
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

  return (
    <div>
      <h1>Countries</h1>
      <Filter handleChange={handleOnChange} />
      {filteredCountries.map((x) => {
        return <div key={x.name.common}>{x.name.common}</div>;
      })}
      <Notification message={message} />
    </div>
  );
};

export default App;
