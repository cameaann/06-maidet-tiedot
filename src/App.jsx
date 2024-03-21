import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [notifyMessage, setNotifyMessage] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((res) => {
      setCountries(res);
    });

    // return () => {
    //   // cleanup;
    // };
  }, []);

  console.log("RENDER");

  const filterCountries = () => {
    // console.log(searchWord);

    if (searchWord === "") {
      return [];
    }

    const arr = countries.filter((x) =>
      x.name.common.toLowerCase().includes(searchWord.toLowerCase())
    );
    // console.log(arr.length);

    if (arr.length > 10) {
      const newMessage = "Too many matches, specify another filter";
      console.log("NEW", newMessage);
      console.log("MSG", notifyMessage);
      console.log("OBJECT IS", Object.is(newMessage, notifyMessage))
      // if (newMessage !== notifyMessage) 
        setNotifyMessage(newMessage);
      return [];
    }
    return arr;
  };

  const fCountries = filterCountries();

  const handleOnChange = (name) => {
    setSearchWord(name);
    console.log("KEY", name);
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
