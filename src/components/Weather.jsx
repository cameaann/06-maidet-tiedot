const Weather = ({ weatherInfo, capital }) => {

  return (
    <div>
      <h4>Weather in {capital}</h4>
      <div>
        <span>temperature {(weatherInfo?.main.temp - 273.15).toFixed(2)} Celcius</span>
        <figure>
                <img src={weatherInfo?.iconUrl} alt={weatherInfo.weather.description}/>
        </figure>
        
        <span>Wind {weatherInfo?.wind.speed} m/s</span>
      </div>
    </div>
  );
  
};
export default Weather;
