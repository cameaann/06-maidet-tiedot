import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    countryService.getCountries().then((res) => {
      setCountries(res);
    });

    return () => {
      // cleanup;
    };
  }, []);

  const handleOnChange = (event) =>{
    const { value } = event.target;
    setSearch(value);
    console.log(search)
  }
  

  return (
    <div>
      <h1>Countries</h1>
      <Filter handleChange = {handleOnChange}/>
      {countries.map((x) => {
        return <div key={x.name.common}>{x.name.common}</div>;
      })}
    </div>
  );
};

export default App;
