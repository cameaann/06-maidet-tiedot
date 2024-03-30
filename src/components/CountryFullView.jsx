import { useState, useEffect } from "react";
import weatherService from "../services/weatherService";
import Country from "./Country";
import Weather from "./Weather";
import Notification from "./Notification";

const CountryFullView = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (country) {
      try {
        weatherService.getWeatherInfo(country).then((response) => {
          setWeatherInfo(response);
          setLoading(true)
        });
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    }
  }, [country]);

  let message;

  if (loading) {
    message = "Loading information about weather";
  } 
  // else {
  //   console.log(loading);
  //   return content = (
  //     <Weather weatherInfo={weatherInfo} capital={country.capital[0]} />
  //   );
  // }

  return (
    <div>
      <Country country={country} />
      {loading && (<Notification message = {message}/>)}
      {weatherInfo && (<Weather weatherInfo={weatherInfo} capital={country.capital[0]} />)}
    </div>
  );
};

export default CountryFullView;
