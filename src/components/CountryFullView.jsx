import { useState, useEffect } from "react";
import weatherService from "../services/weatherService";
import Country from "./Country";
import Weather from "./Weather";

const CountryFullView = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {      
      try {
        weatherService.getWeatherInfo(country).then((response) => {
            setWeatherInfo(response);
            setLoading(false)          
        });
      } catch (error) {
        console.error()
      } 

  }, [country]);


  return (
    <div>
      <Country country={country} />
      {loading && (<span className="loader"></span>)}
      {weatherInfo && (<Weather weatherInfo={weatherInfo} capital={country.capital[0]} />)}
    </div>
  );
};

export default CountryFullView;
