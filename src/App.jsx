import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [fCountries, setFCountries] = useState([]);
  const [notifyMessage, setNotifyMessage] = useState(null);
  const [searchWord, setSearchWord] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  useEffect(() => {
    if (searchWord) {
      setFCountries(filterCountries(searchWord));
      console.log(fCountries);
    } else {
      console.log(searchWord);
      setNotifyMessage("");
      setFCountries([]);
    }
  }, [searchWord]);

  const filterCountries = (searchWord) => {
    const arr = countries.filter((x) =>
      x.name.common.toLowerCase().includes(searchWord.toLowerCase())
    );

    if (arr.length > 10) {
      const newMessage = "Too many matches, specify another filter";
      setNotifyMessage(newMessage);
      return [];
    } else {
      setNotifyMessage("");
    }
    return arr;
  };

  const handleOnChange = (name) => {
    console.log(name);
    setSearchWord(name);
  };

  return (
    <div>
      <h1>Countries</h1>
      <Filter handleChange={handleOnChange} />
      {fCountries.map((x) => {
        return <div key={x.name.common}>{x.name.common}</div>;
      })}
      <Notification message={notifyMessage} />
    </div>
  );
};

export default App;
