import Country from "./Country";
import Weather from "./Weather";
const CountryFullView = ({country, weatherInfo}) =>{
    return (
        <div>
          <Country country={country} />
          <Weather weatherInfo={weatherInfo} capital={country.capital[0]} />
        </div>
      );
}

export default CountryFullView